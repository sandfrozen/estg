import React, { Component } from 'react'
const axios = require('axios')

const CurrentUserContext = React.createContext()

export class CurrentUserProvider extends Component {
  state = {
    user: null,
    processing: false,
    redirecting: false
  }

  componentDidMount () {
    try {
      const cookieUser = JSON.parse(localStorage.getItem('user'))

      if (cookieUser) {
        this.setState({
          user: cookieUser
        })
      }

      console.log('context provider did mount', cookieUser)
    } catch (e) {
      console.log('CurrentUserProvider', e)
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
      .then(result => result.json())
      .then(user => {
        console.log('user', user)
        this.setState(
          {
            user: user,
            processing: false,
            redirecting: true
          },
          () => {
            localStorage.setItem('user', JSON.stringify(user))
          }
        )
      })
      .catch(() => {
        this.setState(
          {
            user: null,
            processing: false,
            redirecting: false
          },
          () => localStorage.clear('user')
        )
      })
  }

  login = (mail, password) => {
    this.setState({ processing: true })
    setTimeout(() => {
      this.getUser(mail, password)
    }, 300)
  }

  logout = () => {
    this.setState({ user: null }, () => localStorage.setItem('user', null))
  }

  render () {
    const { children } = this.props
    return (
      <CurrentUserContext.Provider
        value={{
          login: this.login,
          logout: this.logout,
          user: this.state.user,
          processing: this.state.processing
        }}
      >
        {children}
      </CurrentUserContext.Provider>
    )
  }
}

export const CurrentUserConsumer = CurrentUserContext.Consumer
