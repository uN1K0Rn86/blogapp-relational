const router = require('express').Router()

const { Blog } = require('../models')
const { sequelize } = require('../utils/db')

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('count', sequelize.col('id')), 'blogs'],
      [sequelize.fn('sum', sequelize.col('likes')), 'likes'],
    ],
    order: [['likes', 'DESC']],
  })

  console.log(authors)
  res.json(authors)
})

module.exports = router
