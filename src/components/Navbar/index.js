import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import './style.css'
import AccountCircle from '@material-ui/icons/AccountCircle'
// import StyleSheet from 'react-style';
// import { grey } from '@material-ui/core/colors';

// const styles = StyleSheet.create({
//   navbar_color: {
//     background: grey
//   },
// });

class Navbar extends Component {
  state = {
    open: false
  }

  render () {
    return (
      <CurrentUserConsumer>
        {({ user, logout }) => (
          <div className='root2'>
            <AppBar position='static' className='dark_yellow'>
              <Toolbar>
                <Typography
                  variant='h6'
                  component={Link}
                  to='/'
                  color='inherit'
                  className='grow no_link'
                >
                  Lisboa places
                </Typography>
                {user ? (
                  <Fragment>
                    <Button
                      color='inherit'
                      component={Link}
                      to={`/user/${user.userID}`}
                    >
                      {user.name}&nbsp;
                      <AccountCircle />
                    </Button>
                    <Button color='inherit' onClick={logout}>
                      Logout
                    </Button>
                  </Fragment>
                ) : (
                  <Button
                    color='inherit'
                    component={Link}
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location }
                    }}
                  >
                    Login | New Account
                  </Button>
                )}
              </Toolbar>
            </AppBar>
          </div>
        )}
      </CurrentUserConsumer>
    )
  }
}

export default withRouter(Navbar)
