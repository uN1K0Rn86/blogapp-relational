const router = require('express').Router()

const {
  tokenExtractor,
  sessionValidator,
  userValidator,
} = require('../utils/middleware')

const ReadingLists = require('../models/readingLists')

router.post('/', async (req, res) => {
  const { userId, blogId } = req.body
  const addedList = await ReadingLists.create({
    userId,
    blogId,
  })
  res.json(addedList)
})

router.put(
  '/:id',
  tokenExtractor,
  sessionValidator,
  userValidator,
  async (req, res, next) => {
    const readingList = await ReadingLists.findByPk(req.params.id)

    if (!req.decodedToken.id || req.decodedToken.id !== readingList.userId) {
      throw new Error('Cannot mark another users blog')
    }

    try {
      readingList.read = req.body.read
      await readingList.save()
      res.status(200).json(readingList)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
