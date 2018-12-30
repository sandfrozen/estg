import React, { Component } from 'react'

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
    } catch (e) {
      console.log('CurrentUserProvider', e)
    }
  }

  getUser = () => {
    this.setState(
      {
        user: { id: 2, name: 'Tomek B' },
        processing: false,
        redirecting: true
      },
      () => localStorage.setItem('user', JSON.stringify(this.state.user))
    )
    // window.FB.api('/me', user => {
    //   this.setState({
    //     user,
    //     processing: false,
    //     redirecting: true
    //   })
    // })
  }

  login = () => {
    this.setState({ processing: true })
    setTimeout(() => {
      this.getUser()
    }, 1000)

    // window.FB.getLoginStatus(response => {
    //   if (response.status !== 'connected') {
    //     this.getUser()
    //   } else {
    //     window.FB.login(user => {
    //       this.getUser()
    //     })
    //   }
    // })
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
