const express = require('express')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDb } = require('./utils/db')

const blogsRouter = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const { errorHandler } = require('./utils/middleware')

app.use(errorHandler)

const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
