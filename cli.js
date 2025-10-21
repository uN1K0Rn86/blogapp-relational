require('dotenv').config()

const Blog = require('./models/blog')

const sequelize = require('./utils/db')

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await Blog.findAll()
    blogs.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    })
    sequelize.close()
  } catch (e) {
    console.error('Unable to connect', e)
  }
}

main()
