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
import User from './components/User/index.js'
import Poi from './components/Poi/Poi.js';
import NewPoi from './components/NewPoi/NewPoi.js';
import Pois from './components/Pois/Pois.js';
import PoiRoutes from './components/PoiRoutes/PoiRoutes.js';
import ButtonsBar from './components/ButtonsBar/ButtonsBar.js';

class App extends Component {
  render () {
    return (
      <Router>
        <CurrentUserProvider>
          <Navbar />
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/user/:id/:name' component={User} />
              <Route exact path='/poi/:id/:title' component={Poi} />
              <Route exact path='/poi-new' component={NewPoi} />
              <Route exact path='/poi-edit/:id' component={NewPoi} />
              <Route exact path='/pois' component={Pois} />
              <Route exact path='/routes' component={PoiRoutes} />
              <Route component={NotFound} />
            </Switch>
            <ButtonsBar />
        </CurrentUserProvider>
      </Router>
    )
  }
}

export default App
