import axios from 'axios'

/**
 * ACTION TYPES
 */
const UPDATE_VOTES = 'UPDATE_VOTES'
const GOT_VOTES = 'GOT_VOTES'

/**
 * INITIAL STATE
 */
const defaultVotes = {
  'react': [],
  'vue': [],
  'ember.js': [],
  'angular.js': [],
}

/**
 * ACTION CREATORS
 */

const updateVotes = (updatedVotes, framework) => ({
  type: UPDATE_VOTES,
  updatedVotes,
  framework
})

const gotVotes = (votes, framework) => ({
  type: GOT_VOTES,
  votes,
  framework
})

/**
 * THUNK CREATORS
 */

export const getGitHubVotes = (framework, owner) => async dispatch => {
  let nextPage = 1
  let newVotes = []
  try {
    while (nextPage <= 10) {
      let nextVotes = await axios.get(
        `https://api.github.com/repos/${owner}/${framework}/events?page=${nextPage}`
      )
      nextPage++
      let nextNewVotesData = await axios.post(
        `/api/votes/`,
        nextVotes.data
      )
      newVotes = [...newVotes, ...nextNewVotesData.data]
    }
    dispatch(updateVotes(newVotes, framework))
  } catch (err) {
    console.error(err)
  }
}

export const fetchVotes = (framework, owner) => async dispatch => {
  try {
    const res = await axios.get(`/api/votes?framework=${framework}&owner=${owner}`)
    dispatch(gotVotes(res.data, framework))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultVotes, action) {
  switch (action.type) {
    case GOT_VOTES:
      return {
        ...state,
        [action.framework]: [...action.votes]
      }
    case UPDATE_VOTES:
      return {
        ...state,
        [action.framework]: [...state[action.framework], ...action.updatedVotes]
      }
    default:
      return state
  }
}
