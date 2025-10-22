const router = require('express').Router()

const ReadingLists = require('../models/readingLists')

router.post('/', async (req, res) => {
  const { userId, blogId } = req.body
  const addedList = await ReadingLists.create({
    userId,
    blogId,
  })
  res.json(addedList)
})

module.exports = router
