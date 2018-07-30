import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon, Label, Menu, Table, Container} from 'semantic-ui-react'
import {getGitHubReactVotes, fetchReactVotes} from '../store'

class FrameworkData extends Component {
  constructor(){
    super()
    this.state = {
      loading: true
    }
  }

async componentDidMount(){
  await this.props.getOldReactVotes()
  // await this.props.getNewReactVotes()
  this.setState({loading: false})
}

filterReactVotes = (reactVotes) => {
  const pullRequests = reactVotes.filter(vote => vote.type === 'PullRequestEvent')
  const issues = reactVotes.filter(vote => vote.type === 'IssuesEvent')
  const forks = reactVotes.filter(vote => vote.type === 'ForkEvent')
  return {pullRequests, issues, forks}
}

  render() {

    if (this.state.loading) return (<h1>LOADING</h1>)

    const filteredReactVotes = this.filterReactVotes(this.props.reactVotes)

    return (
      <Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Framework</Table.HeaderCell>
            <Table.HeaderCell>Fork Events</Table.HeaderCell>
            <Table.HeaderCell>Pull Request Events</Table.HeaderCell>
            <Table.HeaderCell>Issues Event</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>React</Table.Cell>
            <Table.Cell>{filteredReactVotes.forks.length}</Table.Cell>
            <Table.Cell>{filteredReactVotes.pullRequests.length}</Table.Cell>
            <Table.Cell>{filteredReactVotes.issues.length}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      </Container>
    )
  }
}


const mapStateToProps = state => {
  return {
    reactVotes: state.votes.reactVotes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNewReactVotes: () => dispatch(getGitHubReactVotes()),
    getOldReactVotes: () => dispatch(fetchReactVotes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameworkData);
