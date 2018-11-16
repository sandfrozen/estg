import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'


import { CurrentUserProvider } from './context/CurrentUser.context.js'
import Navbar from './components/Navbar.js'
import './App.css'
import MainPage from './components/MainPage.js'
import Login from './components/Login.js'
import NotFound from './components/NotFound.js'

class App extends Component {
  render () {
    return (
      <Router>
        <CurrentUserProvider>
          <Navbar />
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path='/login' component={Login} />
            <Route component={NotFound} />
          </Switch>
        </CurrentUserProvider>
      </Router>
    )
  }
}

export default App
