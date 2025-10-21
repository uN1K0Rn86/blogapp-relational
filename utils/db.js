const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
})

const connectToDb = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to PSQL database established')
  } catch (error) {
    console.log('Connection to database failed')
    return process.exit(1)
  }
  return null
}

module.exports = { connectToDb, sequelize }
