const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = null
  if (blogs.length===0) {
    return favorite
  }

  blogs.forEach((blog) => {
    if (favorite === null) {
      favorite = blog
    }
    if (favorite.likes < blog.likes) {
      favorite = blog
    }
  })

  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
