const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./readingLists')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'marked_users' })

module.exports = {
  Blog,
  User,
  ReadingLists,
}
