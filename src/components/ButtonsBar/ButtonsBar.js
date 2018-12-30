import React from 'react'
import './style.css'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'

const ButtonsBar = () => {
  return (
    <CurrentUserConsumer>
      {({ user, logout }) => (
        <div className='buttons-bar'>
          {user && (
            <Button color='primary' component={Link} to={`/user/${user.id}/${user.name}`}>
              My Account
            </Button>
          )}
          <Button color='primary' component={Link} to={`/poi-new`}>
            Add new POI
          </Button>
          <Button color='primary' component={Link} to={`/pois`}>
            All POIs
          </Button>
          <Button color='primary' component={Link} to={`/pois`}>
            My POIs
          </Button>
          <Button color='primary' component={Link} to={`/routes`}>
            My Routes
          </Button>
        </div>
      )}
    </CurrentUserConsumer>
  )
}

export default ButtonsBar
