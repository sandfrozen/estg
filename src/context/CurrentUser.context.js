import React, { Component } from 'react'

const CurrentUserContext = React.createContext()

export class CurrentUserProvider extends Component {
  state = {
    user: null,
    processing: false,
    redirecting: false
  }

  getUser = () => {
    this.setState({
      user: { name: 'Tomek B' },
      processing: false,
      redirecting: true
    })
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
    console.log('login')
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
    this.setState({ user: null })
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
