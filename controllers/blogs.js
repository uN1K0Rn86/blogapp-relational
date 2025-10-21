const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const newBlog = await Blog.create(req.body)
  res.json(newBlog)
})

router.delete('/:id', async (req, res) => {
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

module.exports = router
