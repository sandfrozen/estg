import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { Redirect } from 'react-router-dom'
import getNameAndId from '../../helpers/helpers'

class User extends Component {
  render () {
    const { name_and_id } = this.props.match.params || { name_and_id: '0' }

    if (name_and_id !== '0') {
      const { name, id } = getNameAndId(name_and_id)
      return (
        <Paper className='paper-w-w'>
          <p>Account info</p>
          <p>{name}</p>
          <p>{id}</p>
        </Paper>
      )
    } else {
      
    }
  }
}

export default User
