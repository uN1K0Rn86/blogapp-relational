const router = require('express').Router()
const { Op } = require('sequelize')

const {
  tokenExtractor,
  sessionValidator,
  userValidator,
} = require('../utils/middleware')
const { Blog, User } = require('../models')
const { sequelize } = require('../utils/db')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iRegexp]: req.query.search } },
      { author: { [Op.iRegexp]: req.query.search } },
    ]
  }

  const blogs = await Blog.findAll({
    attributes: {
      exclude: ['userId'],
    },
    include: {
      model: User,
      attributes: ['name', 'username'],
    },
    order: [['likes', 'DESC']],
    where,
  })
  res.json(blogs)
})

router.post(
  '/',
  tokenExtractor,
  sessionValidator,
  userValidator,
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.decodedToken.id)
      const newBlog = await Blog.create({ ...req.body, userId: user.id })
      res.json(newBlog)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  tokenExtractor,
  sessionValidator,
  userValidator,
  async (req, res) => {
    const blogToDelete = await Blog.findByPk(req.params.id)
    const blogOwnerId = blogToDelete.userId
    const loggedUserId = req.decodedToken.id

    if (!(blogOwnerId === loggedUserId)) {
      throw new Error('Blog can only be deleted by owner')
    }

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
  }
)

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
