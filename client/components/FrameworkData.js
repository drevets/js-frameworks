import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table, Container, Header} from 'semantic-ui-react'
import {getGitHubVotes, fetchVotes} from '../store'

class FrameworkData extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      frameworks: [
        {
          framework: 'react',
          owner: 'facebook'
        },
        {
          framework: 'vue',
          owner: 'vuejs'
        },
        {
          framework: 'ember.js',
          owner: 'emberjs'
        },
        {
          framework: 'angular.js',
          owner: 'angular'
        }
      ]
    }
  }

  async componentDidMount() {
    await this.state.frameworks.forEach(async framework => {
      await this.props.getOldVotes(framework.framework, framework.owner)
      // await this.props.getNewVotes(framework.framework, framework.owner)
    })
    this.setState({loading: false})
  }

  filterVotes = votes => {
    const pullRequests = votes.filter(vote => vote.type === 'PullRequestEvent')
    const issues = votes.filter(vote => vote.type === 'IssuesEvent')
    const forks = votes.filter(vote => vote.type === 'ForkEvent')
    return {pullRequests, issues, forks}
  }

  filterVotes = votes => {
    let filteredVotes = {}
    for (let framework in votes) {
      const pullRequests = votes[framework].filter(
        vote => vote.type === 'PullRequestEvent'
      )
      const issues = votes[framework].filter(
        vote => vote.type === 'IssuesEvent'
      )
      const forks = votes[framework].filter(vote => vote.type === 'ForkEvent')
      filteredVotes[framework] = {pullRequests, issues, forks}
    }
    return filteredVotes
  }

  getNewVotes = (frameworks) => {
    frameworks.forEach(async framework => {
      await this.props.getNewVotes(framework.framework, framework.owner)
    })
  }

  render() {
    if (this.state.loading) return <h1>LOADING</h1>

    const filteredVotes = this.filterVotes(this.props.votes)

    // const oneVote = this.props.votes.react[0]
    // const twoVote = this.props.votes.react[1]
    // console.log('oneVote', oneVote, 'twoVote', twoVote)

    // console.log('oneVote minus twoVote', oneVote > twoVote)

    // const getNewVotes = window.setInterval(this.getNewVotes, 60000, this.state.frameworks)

    return (
      <Container style={{padding: '30px'}}>
        <Header as='h1'>The Next Great JS Framework</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Framework</Table.HeaderCell>
              <Table.HeaderCell>Fork Events</Table.HeaderCell>
              <Table.HeaderCell>Pull Request Events</Table.HeaderCell>
              <Table.HeaderCell>Issues Events</Table.HeaderCell>
              <Table.HeaderCell>Total Votes</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>React</Table.Cell>
              <Table.Cell>{filteredVotes.react.forks.length}</Table.Cell>
              <Table.Cell>{filteredVotes.react.pullRequests.length}</Table.Cell>
              <Table.Cell>{filteredVotes.react.issues.length}</Table.Cell>
              <Table.Cell>{filteredVotes.react.issues.length + filteredVotes.react.forks.length + filteredVotes.react.pullRequests.length}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Vue</Table.Cell>
              <Table.Cell>{filteredVotes.vue.forks.length}</Table.Cell>
              <Table.Cell>{filteredVotes.vue.pullRequests.length}</Table.Cell>
              <Table.Cell>{filteredVotes.vue.issues.length}</Table.Cell>
              <Table.Cell>{filteredVotes.vue.issues.length + filteredVotes.vue.forks.length + filteredVotes.vue.pullRequests.length}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Ember</Table.Cell>
              <Table.Cell>{filteredVotes.ember.forks.length}</Table.Cell>
              <Table.Cell>{filteredVotes.ember.pullRequests.length}</Table.Cell>
              <Table.Cell>{filteredVotes.ember.issues.length}</Table.Cell>
              <Table.Cell>{filteredVotes.ember.issues.length + filteredVotes.ember.forks.length + filteredVotes.ember.pullRequests.length}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Angular</Table.Cell>
              <Table.Cell>{filteredVotes.angular.forks.length}</Table.Cell>
              <Table.Cell>{filteredVotes.angular.pullRequests.length}</Table.Cell>
              <Table.Cell>{filteredVotes.angular.issues.length}</Table.Cell>
              <Table.Cell>{filteredVotes.angular.issues.length + filteredVotes.angular.forks.length + filteredVotes.angular.pullRequests.length}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    votes: {
      react: state.votes.react,
      vue: state.votes.vue,
      ember: state.votes['ember.js'],
      angular: state.votes['angular.js']
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNewVotes: (framework, owner) =>
      dispatch(getGitHubVotes(framework, owner)),
    getOldVotes: (framework, owner) => dispatch(fetchVotes(framework, owner))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameworkData)
