const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const listWithManyBlogs = require('../fixtures/blogs_list').listWithManyBlogs
const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  let loggedInUser

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(listWithManyBlogs)

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('thedeadqueen', 10)
    loggedInUser = await new User({
      _id: '5a422a851b54a676234d17aa',
      username: 'mhamilton',
      name: 'Margaret Hamilton',
      passwordHash,
      __v: 0, }).save()
  })

  test('bloglist is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, listWithManyBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(e => e.author)
    assert(authors.includes('Edsger W. Dijkstra'))
  })

  test('first blog has property "id"', async () => {
    const response = await api.get('/api/blogs')

    const firstBlog = response.body[0]
    assert.ok(Object.hasOwn(firstBlog, 'id'))
  })

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const firstBlog = (await helper.blogsInDb())[0]

      const resultBlog = await api
        .get(`/api/blogs/${firstBlog.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(
        resultBlog.body,
        { ...firstBlog, user: { id: loggedInUser.id, name:loggedInUser.name, username:loggedInUser.username } }
      )
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api.get(`/api/blogs/${invalidId}`).expect(400)
    })
  })

  describe('addition/modification of a new blog', () => {

    let token=''

    beforeEach(async () => {
      const result = await api
        .post('/api/login')
        .send({ username: loggedInUser.username, password: 'thedeadqueen' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      token = result.body.token
    })

    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Small and secure Docker images for Rust: Alpine vs Debian vs Scratch',
        author: 'Sylvain Kerkour',
        url: 'https://kerkour.com/rust-docker',
        likes: 18,
        userId: loggedInUser._id.toString()
      }

      await api
        .post('/api/blogs')
        .auth(token, { type:'bearer' } )
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, listWithManyBlogs.length + 1)
      const lastBlog = blogsAtEnd.pop()
      delete(lastBlog.id)
      delete(lastBlog.user)

      assert.deepStrictEqual({ ...lastBlog, userId: loggedInUser.id },newBlog)
    })

    test('a blog without likes property is still valid', async () => {
      const newBlog = {
        title: 'Small and secure Docker images for Rust: Alpine vs Debian vs Scratch',
        author: 'Sylvain Kerkour',
        url: 'https://kerkour.com/rust-docker',
        userId: loggedInUser.id.toString()
      }

      await api
        .post('/api/blogs')
        .auth(token, { type:'bearer' } )
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      newBlog.likes = 0

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, listWithManyBlogs.length + 1)
      const lastBlog = blogsAtEnd.pop()
      delete(lastBlog.id)
      delete(lastBlog.user)

      assert.deepStrictEqual({ ...lastBlog, userId: loggedInUser.id }, newBlog )
    })

    test('blog without title is not added', async () => {
      const newBlog = {
        author: 'Martin Fowler'
      }

      await api
        .post('/api/blogs')
        .auth(token, { type:'bearer' } )
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, listWithManyBlogs.length)
    })

    test('blog without url is not added', async () => {
      const newBlog = {
        author: 'Martin Fowler',
        title: 'this is a fake title'
      }

      await api
        .post('/api/blogs')
        .auth(token, { type:'bearer' } )
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, listWithManyBlogs.length)
    })

    describe('deletion of a blog', () => {
      test('succeeds with status code 204 if id is valid', async () => {

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .auth(token, { type:'bearer' } )
          .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const ids = blogsAtEnd.map(n => n.id)
        assert(!ids.includes(blogToDelete.id))

        assert.strictEqual(blogsAtEnd.length, listWithManyBlogs.length - 1)
      })
    })

    describe('update of a blog', () => {
      test('succeeds with status code 200 if id is valid', async () => {

        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send({ likes: 163 })
          .auth(token, { type:'bearer' } )
          .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd[0].likes, 163)
      })

      test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        await api
          .put(`/api/blogs/${validNonexistingId}`)
          .send({ likes:163 })
          .auth(token, { type:'bearer' } )
          .expect(404)
      })

      test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api.put(`/api/blogs/${invalidId}`).send({ likes:163 }).expect(400)
      })

      test('fails with likes not an int', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send({ likes: false })
          .auth(token, { type:'bearer' } )
          .expect(400)
      })

    })

  })

})
after(async () => {
  await mongoose.connection.close()
})