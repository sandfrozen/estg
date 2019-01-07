import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { Redirect } from 'react-router-dom'
import getNameAndId from '../../helpers/helpers'

class User extends Component {
  render () {
    const { id } = this.props.match.params || { id: '0' }

    if (id !== '0') {
      return (
        <Paper className='paper-w-w'>
          <p>Account info</p>
          <p>fetching... user id: {id}</p>
        </Paper>
      )
    } else {
      
    }
  }
}

export default User
