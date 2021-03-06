import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { CurrentUserProvider, CurrentUserConsumer } from './context/CurrentUser.context.js'
import Navbar from './components/Navbar'
import './App.css'
import MainPage from './components/MainPage/MainPage'
import Login from './components/Login/Login'
import AdminLogin from './components/admin/AdminLogin'
import NotFound from './components/NotFound.js'
import User from './components/User/index.js'
import Poi from './components/Poi/Poi.js'
import ButtonsBar from './components/ButtonsBar/ButtonsBar.js'
import PoiEdit from './components/PoiEdit/PoiEdit.js'
import NewPoi from './components/PoiEdit/NewPoi.js'
import Users from './components/Users/Users.js';
import AdminUsers from './components/admin/AdminUsers.js';
import Path from './components/Path/Path.js';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <CurrentUserConsumer>
        {({ user }) =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      </CurrentUserConsumer>
    )}
  />
)

class App extends Component {
  render () {
    return (
      <Router>
        <CurrentUserProvider>
          <Navbar />
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/poi/:id' component={Poi} />
            <PrivateRoute exact path='/admin' component={AdminLogin} />
            <PrivateRoute exact path='/admin/users' component={AdminUsers} />
            <PrivateRoute exact path='/user/:id' component={User} />
            <PrivateRoute exact path='/path/:id' component={Path} />
            <PrivateRoute exact path='/users' component={Users} />
            <PrivateRoute exact path='/new-poi' component={NewPoi} />
            <PrivateRoute exact path='/edit-poi/:id' component={PoiEdit} />
            <Route component={NotFound} />
          </Switch>
          <ButtonsBar />
        </CurrentUserProvider>
      </Router>
    )
  }
}

export default App
