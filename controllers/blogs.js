const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  try {
    const newBlog = await Blog.create(req.body)
    res.json(newBlog)
  } catch (error) {
    next(error)
  }
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

router.put('/:id', async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  try {
    if (req.body.likes) {
      blog.likes = req.body.likes
      await blog.save()
      res.json(blog)
    } else {
      throw new Error('Request must include number of likes')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
