const router = require('express').Router()
const {Vote} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const repo = `${req.query.owner}/${req.query.framework}`
  try {
    const votes = await Vote.findAll({where: {
      repoName: repo
    }, attributes: ['type', 'actorId', 'voteTime']})
    res.json(votes)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const voteTypes = {
    'IssuesEvent': true,
    'PullRequestEvent': true,
    'ForkEvent': true
  }
  const votes = req.body.filter(element => {
    return voteTypes[element.type]
  })
  try {
    const createdVotes = await votes.map(async vote => {
      const [returnedInstance, created] = await Vote.findOrCreate({where: {
        voteId: Number(vote.id)
      }, defaults: {voteId: Number(vote.id), type: vote.type, actorId: vote.actor.id, repoId: vote.repo.id, repoName: vote.repo.name, voteTime: vote.created_at}})
      return [returnedInstance, created]
    }).filter(vote => {
      return vote[1]
    })
    res.send(createdVotes)
  } catch (err) {
    next(err)
  }
})
