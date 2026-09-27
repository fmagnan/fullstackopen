const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {
  listWithOneBlog,
  listWithManyBlogs,
} = require('../fixtures/blogs_list')

describe('most likes', () => {
  test('of empty list is null', () => {
    const blogs = []

    const result = listHelper.mostLikes(blogs)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, this blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list return the author with most likes', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
