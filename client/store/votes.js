import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_REACT_VOTES = 'GOT_REACT_VOTES'
const GET_VUE_VOTES = 'GET_VUE_VOTES'
const GET_EMBER_VOTES = 'GET_EMBER_VOTES'
const GET_ANGULAR_VOTES = 'GET_ANGULAR_VOTES'
const UPDATE_REACT_VOTES = 'UPDATE_REACT_VOTES'

/**
 * INITIAL STATE
 */
const defaultVotes = {
  reactVotes: [],
  vueVotes: [],
  emberVotes: [],
  angularVotes: []
}

/**
 * ACTION CREATORS
 */

 //damn gotta change this get and got stuff
const gotReactVotes = reactVotes => ({type: GOT_REACT_VOTES, reactVotes})

const gotVueVotes = vueVotes => ({type: GET_VUE_VOTES, vueVotes})

const gotEmberVotes = emberVotes => ({type: GET_EMBER_VOTES, emberVotes})

const gotAngularVotes = angularVotes => ({type: GET_ANGULAR_VOTES, angularVotes})

const updateReactVotes = updatedReactVotes => ({
  type: UPDATE_REACT_VOTES, updatedReactVotes
})


/**
 * THUNK CREATORS
 */

 //this should call GitHub API and fetch 300 most recent events and send them to database where new votes will either be created or not, and then the new created votes will be sent back

 //this should only be called once, and after that, can just call for the votes that have been created since the last database update (how can I get this to run in the background??)
export const getGitHubReactVotes = () => async dispatch => {
  let nextPage = null
  let lastPage = null
  let newVotes = []
  try {
    const res = await axios.get('https://api.github.com/repos/facebook/react/events')
    const headerLink = res.headers.link.split('?')
    nextPage = Number(headerLink[1].split('>')[0].split('=')[1])
    lastPage = Number(headerLink[2].split('>')[0].split('=')[1])
    const votes = res.data
    let newVotesData = await axios.post('/api/votes/react', votes)
    newVotes = newVotesData.data
    while (nextPage <= lastPage) {
      let nextVotes = await axios.get(`https://api.github.com/repos/facebook/react/events?page=${nextPage}`)
      nextPage ++
      let nextNewVotesData = await axios.post('/api/votes/react', nextVotes.data)
      newVotes = [...newVotes, ...nextNewVotesData.data]
    }
    dispatch(updateReactVotes(newVotes))
  } catch (err) {
    console.error(err)
  }
}

export const fetchReactVotes = () => async dispatch => {
  try {
    const res = await axios.get('/api/votes/react')
    dispatch(gotReactVotes(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchVueVotes = () => async dispatch => {
  try {
    const res = await axios.get('/api/votes/vue')
    dispatch(gotVueVotes(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchEmberVotes = () => async dispatch => {
  try {
    const res = await axios.get('/api/votes/ember')
    dispatch(gotEmberVotes(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAngularVotes = () => async dispatch => {
  try {
    const res = await axios.get('/api/votes/angular')
    dispatch(gotAngularVotes(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultVotes, action) {
  switch (action.type) {
    case GOT_REACT_VOTES:
      return {...state, reactVotes: action.reactVotes}
    case GET_VUE_VOTES:
      return {...state, vueVotes: action.vueVotes}
    case GET_EMBER_VOTES:
      return {...state, emberVotes: action.emberVotes}
    case GET_ANGULAR_VOTES:
      return {...state, angularVotes: action.angularVotes}
    case UPDATE_REACT_VOTES:
      return {...state, reactVotes: [...state.reactVotes, ...action.updatedReactVotes]}
    default:
      return state
  }
}
