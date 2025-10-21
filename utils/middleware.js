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

  next(error)
}

module.exports = { errorHandler }
