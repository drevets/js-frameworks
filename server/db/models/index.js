const Framework = require('./framework')
const Vote = require('./vote')
const User = require('./user')

Vote.belongsTo(Framework)

module.exports = {
  Framework,
  Vote
}
