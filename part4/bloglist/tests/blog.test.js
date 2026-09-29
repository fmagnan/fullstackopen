const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const {
  listWithOneBlog,
  listWithManyBlogs,
} = require('../fixtures/blogs_list')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listWithManyBlogs)
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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Small and secure Docker images for Rust: Alpine vs Debian vs Scratch',
    author: 'Sylvain Kerkour',
    url: 'https://kerkour.com/rust-docker',
    likes: 18,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, listWithManyBlogs.length + 1)
  const lastBlog = blogsAtEnd.pop()
  delete(lastBlog.id)

  assert.deepStrictEqual(newBlog, lastBlog)
})

test('a blog without likes property is still valid', async () => {
  const newBlog = {
    title: 'Small and secure Docker images for Rust: Alpine vs Debian vs Scratch',
    author: 'Sylvain Kerkour',
    url: 'https://kerkour.com/rust-docker',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  newBlog.likes = 0

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, listWithManyBlogs.length + 1)
  const lastBlog = blogsAtEnd.pop()
  delete(lastBlog.id)

  assert.deepStrictEqual(newBlog, lastBlog)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Martin Fowler'
  }

  await api
    .post('/api/blogs')
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
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, listWithManyBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const ids = blogsAtEnd.map(n => n.id)
  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.length, listWithManyBlogs.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})