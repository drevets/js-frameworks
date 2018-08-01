const Sequelize = require('sequelize')
const db = require('../db')

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

module.exports = Vote
