import React, { Component } from 'react'
import Loading from '../Loading/Loading'
import InputBase from '@material-ui/core/InputBase'
import { FormGroup, Button, Paper } from '@material-ui/core'
import './style.css'
import ta from 'time-ago'
import UserPois from './UserPois'

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
    pois: []
  }

  componentDidMount () {
    this.fetchUser()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      changed: true
    })
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

  putUser = async () => {
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
      pois
    } = this.state

    if (fetching === null) {
      return (
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

            <FormGroup className='user-form width-b'>
              <InputBase
                defaultValue={newName}
                disabled={!editable}
                onChange={this.handleChange('newName')}
              />
              <InputBase
                defaultValue={newMail}
                disabled={!editable}
                onChange={this.handleChange('newMail')}
              />
            </FormGroup>
          </div>
          {editable && (
            <Button
              onClick={() => {
                this.putUser()
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
          )}
          <UserPois pois={pois} editable={editable} />
        </Paper>
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
