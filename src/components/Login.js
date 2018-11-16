import React, { Component } from 'react';
import { CurrentUserConsumer } from '../context/CurrentUser.context'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    return (
      <CurrentUserConsumer>
        {({ user, login, processing }) => (
          <div>
            {user && <Redirect to={from} />}
            <p>You must login to view page {from.pathname}</p>
            {processing
              ? <div>Authenticating...</div>
              : <button onClick={login}>Login</button>}
          </div>
        )}
      </CurrentUserConsumer>
    );
  }
}

export default Login;