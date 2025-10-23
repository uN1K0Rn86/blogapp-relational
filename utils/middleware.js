const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const { User, Session } = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'Invalid token' })
    }
  } else {
    return res.status(401).json({ error: 'Token missing' })
  }

  next()
}

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(500).json({ error: error.message })
  }
  if (error.message === 'Request must include number of likes') {
    return res.status(400).json({ error: error.message })
  }
  if (error.message === 'Blog can only be deleted by owner') {
    return res.status(400).json({ error: error.message })
  }
  if (
    error.message === 'Cannot mark another users blog' ||
    error.message === 'Your username has been disabled. Please contact an admin'
  ) {
    return res.status(403).json({ error: error.message })
  }
  if (
    error.message === 'Token disabled' ||
    error.message === 'Session expired'
  ) {
    return res.status(401).json({ error: error.message })
  }

  next(error)
}

const sessionValidator = async (req, res, next) => {
  try {
    if (!req.decodedToken.jti) {
      throw new Error('Token disabled')
    }
    const session = await Session.findOne({
      where: {
        jti: req.decodedToken.jti,
      },
    })
    if (!session) {
      throw new Error('Session expired')
    }
  } catch (error) {
    next(error)
  }
  next()
}

const userValidator = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id, {
    attributes: ['disabled'],
  })

  if (user.disabled) {
    throw new Error('Your username has been disabled. Please contact an admin')
  }
  next()
}

module.exports = {
  tokenExtractor,
  sessionValidator,
  userValidator,
  errorHandler,
}
