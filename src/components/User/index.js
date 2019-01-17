import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Loading from '../Loading/Loading'
import InputBase from '@material-ui/core/InputBase'
import { FormGroup } from '@material-ui/core'
import './style.css'
import ta from 'time-ago'

class User extends Component {
  state = {
    newName: '',
    newMail: '',
    user: null,
    fetching: true,
    editable: false,
    naming: false,
    emailing: false
  }

  componentDidMount () {
    console.log(this.props.match.params.id)
    this.fetchUser()
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

  render () {
    const { user, fetching, editable, newName, newMail } = this.state

    if (fetching === null) {
      return (
        <Paper className='paper-w-w'>
          <div className='community-date'>Account created: {ta.ago(user.dateCreated)}</div>
          <div className='user-container'>
            <img
              className='user-image'
              src='https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png'
              alt='poi'
            />
            <FormGroup className='user-form'>
              <InputBase defaultValue={newName} disabled={!editable} />
              <InputBase defaultValue={newMail} disabled={!editable} />
            </FormGroup>

          </div>
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
