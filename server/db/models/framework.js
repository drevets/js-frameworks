const Sequelize = require('sequelize')
const db = require('../db')

const Framework = db.define('framework', {
  name: {
    type: Sequelize.STRING
  }
})


module.exports = Framework
