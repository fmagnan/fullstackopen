const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {
  listWithOneBlog,
  listWithManyBlogs,
} = require('../fixtures/blogs_list')

describe('total likes', () => {
  test('of empty list is 0', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 36)
  })
})
