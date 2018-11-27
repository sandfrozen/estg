import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { CurrentUserProvider } from './context/CurrentUser.context.js'
import Navbar from './components/Navbar'
import './App.css'
import MainPage from './components/MainPage'
import Login from './components/Login'
import NotFound from './components/NotFound.js'
import Account from './components/Account/index.js'

class App extends Component {
  render () {
    return (
      <Router>
        <CurrentUserProvider>
          <Navbar />
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/account' component={Account} />
              <Route component={NotFound} />
            </Switch>
        </CurrentUserProvider>
      </Router>
    )
  }
}

export default App
