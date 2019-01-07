import React, { Component, Fragment } from 'react'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import { Redirect } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import './style.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Formik } from 'formik'
import Chip from '@material-ui/core/Chip'
import * as _ from 'ramda'
import LinearProgress from '@material-ui/core/LinearProgress'
import Loading from '../Loading/Loading';

function TabContainer (props) {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

class Login extends Component {
  state = {
    tab: 0,
    email: 'tombs@wp.pl',
    password: 'password',
    newname: '',
    newemail: '',
    newpassword: '',
    registerable: false
  }

  handleTabChange = (event, tab) => {
    this.setState({ tab })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { tab } = this.state
    return (
      <Paper elevation={1} className='login-paper'>
        <AppBar position='static'>
          <Tabs value={tab} onChange={this.handleTabChange} centered>
            <Tab label='Login' />
            <Tab label='New Account' />
          </Tabs>
        </AppBar>
        {tab === 0 &&
          <TabContainer>
            <CurrentUserConsumer>
              {({ user, login, processing }) => (
                <div>
                  {user && <Redirect to={from} />}
                  <p>Login to view page {from.pathname}</p>
                  {processing
                    ? <Fragment>
                      <Loading />
                    </Fragment>
                    : <form
                      noValidate
                      autoComplete='off'
                      className='login-form'
                      >
                      <TextField
                        id='email'
                        label='Email'
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin='normal'
                        variant='outlined'
                        />
                      <TextField
                        id='password'
                        label='Password'
                        type='password'
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        margin='normal'
                        variant='outlined'
                        />
                      <Button
                        onClick={login}
                        variant='contained'
                        color='primary'
                        >
                          Login
                        </Button>
                    </form>}
                </div>
              )}
            </CurrentUserConsumer>
          </TabContainer>}
        {tab === 1 &&
          <TabContainer>
            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              validate={values => {
                let errors = {}
                if (!values.email) {
                  errors.email = 'Required'
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address'
                }

                if (values.password.length < 6) {
                  errors.password = 'Min 6 characters'
                }

                if (!values.name) {
                  errors.name = 'Required'
                }

                if (_.isEmpty(errors)) {
                  this.setState({ registerable: true })
                } else {
                  this.setState({ registerable: false })
                }

                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                  setSubmitting(false)
                }, 400)
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit} className='login-form'>
                  <TextField
                    name='name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label='Name'
                    margin='normal'
                    variant='outlined'
                  />
                  {errors.name &&
                    touched.name &&
                    <Fragment>
                      <Chip
                        label={errors.name}
                        color='secondary'
                        variant='outlined'
                      />
                      <br />
                      <br />
                    </Fragment>}
                  <TextField
                    type='email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label='Email'
                    margin='normal'
                    variant='outlined'
                  />
                  {errors.email &&
                    touched.email &&
                    <Fragment>
                      <Chip
                        label={errors.email}
                        color='secondary'
                        variant='outlined'
                      />
                      <br />
                      <br />
                    </Fragment>}
                  <TextField
                    type='password'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label='Password'
                    margin='normal'
                    variant='outlined'
                  />
                  {errors.password &&
                    touched.password &&
                    <Fragment>
                      <Chip
                        label={errors.password}
                        color='secondary'
                        variant='outlined'
                      />
                      <br />
                      <br />
                    </Fragment>}
                  <Button
                    type='submit'
                    variant='contained'
                    disabled={!this.state.registerable}
                  >
                    Register
                  </Button>
                </form>
              )}
            </Formik>
          </TabContainer>}
      </Paper>
    )
  }
}

export default Login
