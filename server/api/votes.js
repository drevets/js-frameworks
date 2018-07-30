const router = require('express').Router()
const {Vote} = require('../db/models')
module.exports = router

//this is /api/votes/X
//need to fill in the attributes + the specific framework

router.get('/react', async (req, res, next) => {
  try {
    const votes = await Vote.findAll({where: {
      repoName: 'facebook/react'
    }, attributes: ['type']})
    res.json(votes)
  } catch (err) {
    next(err)
  }
})

router.post('/react', async (req, res, next) => {
  const voteTypes = {
    'IssuesEvent': true,
    'PullRequestEvent': true,
    'ForkEvent': true
  }
  const votes = req.body.filter(element => {
    return voteTypes[element.type]
  })
  try {
    const createdVotes = votes.map(async vote => {
      const [returnedInstance, created] = await Vote.findOrCreate({where: {
        voteId: Number(vote.id)
      }, defaults: {voteId: Number(vote.id), type: vote.type, actorId: vote.actor.id, repoId: vote.repo.id, repoName: vote.repo.name}})
      return [returnedInstance, created]
    }).filter(vote => {
      return vote[1]
    })
    res.send(createdVotes)
  } catch (err) {
    next(err)
  }
})

router.get('/ember', async (req, res, next) => {
  try {
    const votes = await Vote.findAll({
      attributes: ['id', 'email']
    })
    res.json(votes)
  } catch (err) {
    next(err)
  }
})

router.get('/vue', async (req, res, next) => {
  try {
    const votes = await Vote.findAll({
      attributes: ['id', 'email']
    })
    res.json(votes)
  } catch (err) {
    next(err)
  }
})

router.get('/angular', async (req, res, next) => {
  try {
    const votes = await Vote.findAll({
      attributes: ['id', 'email']
    })
    res.json(votes)
  } catch (err) {
    next(err)
  }
})

//router.post('/*') etc. right here
