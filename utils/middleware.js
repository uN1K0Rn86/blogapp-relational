const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

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

  next(error)
}

module.exports = { tokenExtractor, errorHandler }
