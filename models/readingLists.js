const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class ReadingLists extends Model {}

ReadingLists.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
    unread: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'readingList',
  }
)

module.exports = ReadingLists
