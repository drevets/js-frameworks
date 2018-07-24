import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REACT_VOTES = 'GET_REACT_VOTES'
const GET_VUE_VOTES = 'GET_VUE_VOTES'
const GET_EMBER_VOTES = 'GET_EMBER_VOTES'
const GET_ANGULAR_VOTES = 'GET_ANGULAR_VOTES'
const UPDATE_VOTES = 'UPDATE_VOTES'

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

const updateVotes = updatedVotes => ({
  type: UPDATE_VOTES, updatedVotes
})


/**
 * THUNK CREATORS
 */

export const getGitHubVotes = () => async dispatch => {
  try {
    const res = await axios.get('INSERT GITHUB API HERE')
    //do some sorting into the different houses of votes here
    //will need to make some post requests too right here
    dispatch(updateVotes(res.data))
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
    default:
      return state
  }
}
