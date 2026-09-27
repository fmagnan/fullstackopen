const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {
  listWithOneBlog,
  listWithManyBlogs,
} = require('../fixtures/blogs_list')

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const blogs = []

    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, this blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.strictEqual(result, listWithOneBlog[0])
  })

  test('of a bigger list is the one with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    assert.strictEqual(result, listWithManyBlogs[2])
  })
})
