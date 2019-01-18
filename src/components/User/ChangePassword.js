import React, { Component } from 'react'
import Loading from '../Loading/Loading'
import { FormGroup, Button, Paper } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import './style.css'
import ta from 'time-ago'
import UserPois from './UserPois'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import './style.css'

class ChangePassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    info: 'Change'
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  changePassowrd = async () => {
    this.setState({ info: 'Changed' })
    await fetch('https://localhost:5001/api/users/' + user.userID, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: user.userID,
        oldPassowrd: newName,
        mail: newMail,
        password: user.password,
        active: true,
        dateCreated: user.dateCreated
      }) // body data type must match "Content-Type" header
    })
      .then(result => {
        if (result.status !== 204) {
          throw Error()
        }
        console.log(result)
        this.setState({ changed: false })
        login(newMail, user.password)
      })
      .catch(e => {
        this.setState({ changed: e.message })
      })
  }

  render () {
    const { info } = this.state
    return (
      <CurrentUserConsumer>
        {({ user, login }) => (
          <Paper className='paper-w-w'>
            <div className='community-date'>{user.name} change password:</div>
            <div className='password-container'>
              <div>
                <img
                  className='user-image'
                  src='https://cdn3.iconfinder.com/data/icons/ui-beast-1/32/UI-10-512.png'
                  alt='cp'
                />
              </div>

              <div className='user-form'>
                <TextField
                  id='oldPassword'
                  label='Old Password'
                  type='password'
                  autoComplete='old-password'
                  margin='normal'
                  onChange={this.handleChange('oldPassword')}
                  fullWidth
                />
                <TextField
                  id='newPassword'
                  label='New Password'
                  type='password'
                  autoComplete='new-password'
                  margin='normal'
                  onChange={this.handleChange('newPassword')}
                  fullWidth
                />
              </div>
            </div>
            <br />
            <Button
              onClick={() => {
                this.changePassowrd()
              }}
              variant='contained'
              color='primary'
            >
              {info}
            </Button>
          </Paper>
        )}
      </CurrentUserConsumer>
    )
  }
}

export default ChangePassword
