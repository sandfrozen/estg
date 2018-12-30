import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { Redirect } from 'react-router-dom'

class User extends Component {
  render () {
    let { id, name } = this.props.match.params || { id: '0', name: '0' }
    name = name.replace('-', ' ')
    // fetch user by id and name
    // id = '0'
    // name = '0'
    if (id !== '0' && name !== '0') {
      return (
        <Paper className='paper'>
          Account info {id} {name}
        </Paper>
      )
    } else {
      return <Redirect to='/notfound' />
    }
  }
}

export default User
