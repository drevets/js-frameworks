import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REACT_VOTES = 'GET_REACT_VOTES'
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
const gotReactVotes = reactVotes => ({type: GET_REACT_VOTES, reactVotes})

const gotVueVotes = vueVotes => ({type: GET_VUE_VOTES, vueVotes})

const gotEmberVotes = emberVotes => ({type: GET_EMBER_VOTES, emberVotes})

const gotAngularVotes = angularVotes => ({type: GET_ANGULAR_VOTES, angularVotes})

const updateReactVotes = updatedReactVotes => ({
  type: UPDATE_REACT_VOTES, updatedReactVotes
})


/**
 * THUNK CREATORS
 */

export const getGitHubReactVotes = () => async dispatch => {
  let nextPage = null
  let lastPage = null
  try {
    console.log('trying to get react votes!')
    const res = await axios.get('https://api.github.com/repos/facebook/react/events')
    const nextPage = res.headers.link
    const headerLink = res.headers.link.split('?')
    console.log('info received from GitHub', res.data)
    console.log('headers received', res.headers.link.split('?'))
    const newVotes = await axios.post('/api/votes/react', res.data)
    console.log('new react votes?', newVotes.data)
    dispatch(updateReactVotes(newVotes.data))
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
    case GET_REACT_VOTES:
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
