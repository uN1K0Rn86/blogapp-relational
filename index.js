require('dotenv').config()
const express = require('express')

const sequelize = require('./db')
const Blog = require('./models/blog')

const app = express()

app.use(express.json())

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  const newBlog = await Blog.create(req.body)
  res.json(newBlog)
})

app.delete('/api/blogs/:id', async (req, res) => {
  const blogToDelete = Blog.findByPk(req.params.id)
  if (blogToDelete) {
    await Blog.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(204).end()
  } else {
    res.status(404)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
