import React, { Component } from 'react'
import {
  Paper,
  Typography,
  TextField,
  Button,
  FormGroup
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'

class AdminLogin extends Component {
  state = {
    password: '',
    admin: false
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  goToAdmin = () => {
    if (this.state.password === 'password') {
      this.setState({ admin: true })
    }
  }

  render () {
    return (
      <CurrentUserConsumer>
        {({ user }) => (
          <Paper className='paper-w-w'>
            {this.state.admin === true && (
              <Redirect
                to={{
                  pathname: '/admin/users',
                  state: { secure: true }
                }}
              />
            )}
            {user.userID !== 1 && <Redirect to='/' />}
            <Typography variant='h6' gutterBottom>
              Access to administration panel
            </Typography>
            <FormGroup>
              <TextField
                id='password'
                label='Password'
                type='password'
                onChange={this.handleChange('password')}
                margin='normal'
                variant='outlined'
              />
              <Button onClick={this.goToAdmin}>Go to admin panel</Button>
            </FormGroup>
          </Paper>
        )}
      </CurrentUserConsumer>
    )
  }
}

export default AdminLogin
