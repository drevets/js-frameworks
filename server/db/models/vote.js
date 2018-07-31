const Sequelize = require('sequelize')
const db = require('../db')

//not realllly certain what kind of data I want to pull in from here. But I'll just start with some basic stuff

const Vote = db.define('vote', {
  voteId: {
    type: Sequelize.BIGINT
  },
  type: {
    type: Sequelize.STRING,
  },
  actorId: {
    type: Sequelize.INTEGER
  },
  repoId: {
    type: Sequelize.INTEGER
  },
  repoName: {
    type: Sequelize.STRING
  },
  voteTime: {
    type: Sequelize.DATE
  }
})


//fields that we want: id, createdAt, type, which repo, actor ID

module.exports = Vote
