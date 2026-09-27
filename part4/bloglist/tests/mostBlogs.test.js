const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {
  listWithOneBlog,
  listWithManyBlogs,
} = require('../fixtures/blogs_list')

describe('most blogs', () => {
  test('of empty list is null', () => {
    const blogs = []

    const result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, this blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of a bigger list return the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})
