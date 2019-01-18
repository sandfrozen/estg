import React, { Component } from 'react'
import transitions from '@material-ui/core/styles/transitions';

const CurrentUserContext = React.createContext()

export class CurrentUserProvider extends Component {
  state = {
    user: null,
    processing: false,
    redirecting: false,
    loginError: ''
  }

  componentDidMount () {
    try {
      const cookieUser = JSON.parse(localStorage.getItem('user'))

      if (cookieUser) {
        fetch('https://localhost:5001/api/auth/check', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            mail: cookieUser.mail,
            userID: cookieUser.userID
          }) // body data type must match "Content-Type" header
        })
          .then(result => {
            if (result.status === 200) {
              this.setState({
                user: cookieUser
              })
            } else {
              this.logout()
            }
          })
          .catch(e => {})
      }

    } catch (e) {
    }
  }

  getUser = async (mail, password) => {
    await fetch('https://localhost:5001/api/auth', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mail: mail,
        password: password
      }) // body data type must match "Content-Type" header
    })
      .then(result => {
        if(result.status === 401) {
          throw new Error('This user is blocked.')
        }
        else if (result.status !== 200) {
          throw new Error('Incorrect values.')
        }
        return result.json()
      })
      .then(user => {
        this.setState(
          {
            user: user,
            processing: false,
            redirecting: true,
            loginError: ''
          },
          () => {
            localStorage.setItem('user', JSON.stringify(user))
          }
        )
      })
      .catch(e => {
        this.setState(
          {
            user: null,
            processing: false,
            redirecting: false,
            loginError: e.message
          },
          () => localStorage.clear('user')
        )
      })
  }

  login = (mail, password) => {
    console.log('logginng', mail, password)
    this.setState({ processing: true })
    setTimeout(() => {
      this.getUser(mail, password)
    }, 300)
  }

  logout = () => {
    this.setState({ user: null, loginError: '' }, () =>
      localStorage.setItem('user', null)
    )
  }

  render () {
    const { children } = this.props
    return (
      <CurrentUserContext.Provider
        value={{
          login: this.login,
          logout: this.logout,
          user: this.state.user,
          processing: this.state.processing,
          loginError: this.state.loginError
        }}
      >
        {children}
      </CurrentUserContext.Provider>
    )
  }
}

export const CurrentUserConsumer = CurrentUserContext.Consumer
