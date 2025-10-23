const router = require('express').Router()

const { tokenExtractor } = require('../utils/middleware')

const Session = require('../models/session')

router.delete('/', tokenExtractor, async (req, res) => {
  const session = await Session.findOne({
    where: {
      jti: req.decodedToken.jti,
    },
  })

  await session.destroy({
    where: {
      jti: req.decodedToken.jti,
    },
  })

  res.status(204).end()
})

module.exports = router
