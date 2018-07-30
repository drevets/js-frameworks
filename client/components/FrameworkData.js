import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon, Label, Menu, Table, Container} from 'semantic-ui-react'
import {getGitHubReactVotes} from '../store'

class FrameworkData extends Component {
  constructor(){
    super()
  }

componentDidMount(){
  this.props.getNewReactVotes()
}

  render() {
    console.log('this.props.reactVotes', this.props.reactVotes)
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
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
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
    getNewReactVotes: () => dispatch(getGitHubReactVotes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameworkData);
