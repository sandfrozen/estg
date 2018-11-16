import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { CurrentUserConsumer } from '../context/CurrentUser.context'

class Navbar extends Component {
  render () {
    return (
      <CurrentUserConsumer>
        {({ user, logout }) => (
          <div className='navbar'>
            <div className='nav-left'>
              <Link to={{ pathname: '/' }} className='nav-link'>Main</Link>
            </div>
            <div className='nav-center' />
            <div className='nav-right'>
              {user
                ? <Fragment>
                    Hello {user.name} 
                    <button onClick={logout}>Logout</button>
                  </Fragment>
                : <Link to={{ pathname: '/login' }} className='nav-link'>
                    Login
                  </Link>}
            </div>
          </div>
        )}
      </CurrentUserConsumer>
    )
  }
}

export default Navbar
