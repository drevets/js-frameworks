const Sequelize = require('sequelize')
const db = require('../db')

//not realllly certain what kind of data I want to pull in from here. But I'll just start with some basic stuff

const Vote = db.define('vote', {
  type: {
    type: Sequelize.STRING,
  }
})


module.exports = Vote
