const router = require('express').Router()
const {Vote} = require('../db/models')
module.exports = router

//this is /api/votes/X
//need to fill in the attributes + the specific framework

router.get('/react', async (req, res, next) => {
  try {
    const votes = await Vote.findAll({
      attributes: ['id', 'email']
    })
    res.json(votes)
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
