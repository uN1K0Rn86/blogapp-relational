const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ['id', 'userId'],
      },
    },
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: {
      model: Blog,
      as: 'readings',
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
      through: {
        attributes: ['unread', 'id'],
      },
    },
  })
  res.json(user)
})

router.post('/', async (req, res, next) => {
  try {
    const { name, username, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = await User.create({
      name,
      username,
      passwordHash,
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const username = req.params.username
    const userToChange = await User.findOne({
      where: {
        username: username,
      },
    })
    userToChange.name = req.body.name
    await userToChange.save()
    res.json(userToChange)
  } catch (error) {
    next(error)
  }
})

module.exports = router
