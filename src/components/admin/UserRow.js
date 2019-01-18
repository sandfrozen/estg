import React, { Component } from 'react'

import TableCell from '@material-ui/core/TableCell'

import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import Loading from '../Loading/Loading'
import './style.css'

class UserRow extends Component {
  state = {
    user: null,
    active: false,
    saved: 'Saved'
  }

  componentDidMount () {
    this.setState({ user: this.props.user, active: this.props.user.active })
  }

  onChangeActive = () => {
    this.setState(
      {
        active: !this.state.active,
        saved: 'Saving..'
      },
      () => this.putUser()
    )
  }

  putUser = async login => {
    const { user, active } = this.state
    await fetch('https://localhost:5001/api/users/' + user.userID, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: user.userID,
        name: user.name,
        mail: user.mail,
        password: user.password,
        active: active,
        dateCreated: user.dateCreated
      }) // body data type must match "Content-Type" header
    })
      .then(result => {
        console.log(result)
        if (result.status !== 204) {
          throw Error()
        }

        this.setState({ saved: 'Saved' })
      })
      .catch(e => {
        this.setState({ saved: 'Error' })
      })
  }

  render () {
    const { user, saved, active } = this.state
    if (user === null) return null
    return (
      <TableRow key={user.userID}>
        <TableCell component='th' scope='row'>
          {user.userID}
        </TableCell>
        <TableCell align='right'>{user.name}</TableCell>
        <TableCell align='right'>{user.mail}</TableCell>
        <TableCell align='right'>
          <Checkbox checked={active} onClick={this.onChangeActive} />
        </TableCell>
        <TableCell align='right' className='r-width'>{saved}</TableCell>
      </TableRow>
    )
  }
}

export default UserRow
