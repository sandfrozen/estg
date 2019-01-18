import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import InputBase from '@material-ui/core/InputBase'
import { FormGroup, Button, Paper, Divider } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import './style.css'
import ta from 'time-ago'
import UserPois from './UserPois'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import $ from 'jquery'

class User extends Component {
  state = {
    newName: '',
    newMail: '',
    user: null,
    fetching: true,
    changed: false,
    editable: false,
    naming: false,
    emailing: false,
    pois: [],
    oldPassword: '',
    newPassword: '',
    passwordInfo: 'Change'
  }

  componentDidMount () {
    this.fetchUser()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
    if (name === 'oldPassword' || name === 'newPassword') {
      this.setState({
        passwordInfo: 'Change'
      })
    } else {
      this.setState({
        changed: true
      })
    }
    
  }

  fetchUser = async () => {
    await fetch(
      `https://localhost:5001/api/users/${this.props.match.params.id}`
    )
      .then(response => response.json())
      .then(user => {
        this.setState(
          {
            user,
            pois: user.pois,
            newName: user.name,
            newMail: user.mail,
            fetching: null
          },
          () => {
            try {
              const cookieUser = JSON.parse(localStorage.getItem('user'))
              const userID = cookieUser.userID
              if (userID === user.userID) {
                this.setState({ editable: true })
              }
            } catch (e) {}
          }
        )
      })
      .catch(e => {
        this.setState({ fetching: e.message })
      })
  }

  changePassowrd = async login => {
    this.setState({ passwordInfo: 'Changing' })
    console.log(
      'cp',
      this.state.oldPassword,
      this.state.newPassword,
      this.state.user.userID
    )
    await fetch(
      'https://localhost:5001/api/auth/change/' + this.state.newPassword,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: this.state.user.userID,
          password: this.state.oldPassword
        }) // body data type must match "Content-Type" header
      }
    )
      .then(result => {
        console.log(result)
        if (result.status !== 200) {
          throw Error('Changing failed, try again')
        }
        login(this.state.newMail, this.state.newPassword)
        this.setState({
          newPassword: '',
          oldPassword: '',
          passwordInfo: 'Changed'
        })
        window.alert('Password changed!')
        $('#cp').toggle()
      })
      .catch(e => {
        this.setState({ passwordInfo: e.message })
      })
  }

  putUser = async login => {
    this.setState({ changed: 'Updating..' })
    const { user, newName, newMail } = this.state
    await fetch('https://localhost:5001/api/users/' + user.userID, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: user.userID,
        name: newName,
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
    const {
      user,
      fetching,
      editable,
      newName,
      newMail,
      changed,
      pois,
      passwordInfo,
      oldPassword,
      newPassword
    } = this.state

    if (fetching === null) {
      return (
        <CurrentUserConsumer>
          {({ user, login }) => (
            <Paper className='paper-w-w'>
              <div className='community-date'>
                Account created: {ta.ago(user.dateCreated)}
              </div>
              <div className='user-container'>
                <div className='width-a'>
                  <img
                    className='user-image'
                    src='https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png'
                    alt='poi'
                  />
                </div>

                <div className='user-form width-a'>
                  <InputBase
                    value={newName}
                    disabled={!editable}
                    onChange={this.handleChange('newName')}
                    fullWidth
                  />
                  <InputBase
                    value={newMail}
                    disabled={!editable}
                    onChange={this.handleChange('newMail')}
                    fullWidth
                  />
                </div>
              </div>
              {editable && (
                <Fragment>
                  <Button
                    onClick={() => {
                      this.putUser(login)
                    }}
                    variant='contained'
                    color='primary'
                    disabled={!changed}
                  >
                    {changed === true
                      ? 'Update'
                      : changed === false
                        ? 'Saved'
                        : changed}
                  </Button>
                  <Button onClick={() => $('#cp').toggle()} color='primary'>
                    Change password
                  </Button>
                  <br />
                  <br />
                  <Divider />
                  <div id='cp'>
                    <div className='community-date'>
                      {user.name} change password:
                    </div>
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
                          value={oldPassword}
                          fullWidth
                        />
                        <TextField
                          id='newPassword'
                          label='New Password: min 6 characters'
                          type='password'
                          autoComplete='new-password'
                          margin='normal'
                          onChange={this.handleChange('newPassword')}
                          value={newPassword}
                          fullWidth
                        />
                      </div>
                    </div>
                    <br />
                    <Button
                      onClick={() => {
                        this.changePassowrd(login)
                      }}
                      variant='contained'
                      color='primary'
                      disabled={
                        oldPassword.length < 6 || newPassword.length < 6
                      }
                    >
                      {passwordInfo}
                    </Button>
                    <br />
                    <br />
                    <Divider />
                  </div>
                </Fragment>
              )}

              <UserPois pois={pois} editable={editable} />
            </Paper>
          )}
        </CurrentUserConsumer>
      )
    } else if (fetching === true) {
      return (
        <Paper className='paper-w-w'>
          <Loading />
        </Paper>
      )
    } else {
      return <Paper className='paper-w-w'>{fetching}</Paper>
    }
  }
}

export default User
