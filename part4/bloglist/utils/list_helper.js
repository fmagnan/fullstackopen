var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((favorite, blog) =>
    blog.likes > favorite.likes ? blog : favorite
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authors = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(Object.keys(authors), (author) => authors[author])

  return { author: topAuthor, blogs: authors[topAuthor] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authors = _.groupBy(blogs, 'author')
  const authorsWithLikes = _.map(authors, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  }))

  return _.maxBy(authorsWithLikes, 'likes')
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}
