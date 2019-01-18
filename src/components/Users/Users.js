import React, { Component, Fragment } from 'react'
import { Paper, Typography, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ta from 'time-ago'
import './style.css'

class Users extends Component {
  state = {
    user: null,
    users: [],
    pois: [],
    fetched: false,
    fetchedPois: true
  }

  componentDidMount () {
    this.fetchUsers()
  }

  fetchUsers = async () => {
    await fetch('https://localhost:5001/api/users')
      .then(response => response.json())
      .then(users => {
        this.setState({ users, fetched: true })
      })
      .catch(e => {
        this.setState({ fetched: e.message })
      })
  }

  fetchPois = async userID => {
    this.setState({ fetchedPois: false })
    await fetch('https://localhost:5001/api/pois/forUser/' + userID)
      .then(response => response.json())
      .then(pois => {
        this.setState({ pois, fetchedPois: true })
      })
      .catch(e => {
        this.setState({ fetchedPois: e.message })
      })
  }

  setUser = user => {
    this.setState({ user, pois: user.pois })
  }

  render () {
    const { pois, users, user } = this.state
    const usersDiv = users.map(u => {
      const date = new Date(u.dateCreated)
      const timeAgo = ta.ago(date)
      return (
        <Fragment>
          <div
            onClick={() => this.setUser(u)}
            key={u.userID}
            className={`like-fragment ${u === user && 'user-selected'}`}
          >
            <img
              className='community-image'
              src='https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png'
              alt='poi'
            />
            <p className='community-like'>
              <Typography
                variant='button'
                gutterBottom
                component={Link}
                to={`/user/${u.userID}`}
              >
                {u.name}
              </Typography>
              <Typography variant="caption" gutterBottom>
                POIS: {u.pois.length}
              </Typography>
            </p>
          </div>
          <Divider />
        </Fragment>
      )
    })

    const poisDiv = pois.map(p => {
      const date = new Date(p.dateCreated)
      const timeAgo = ta.ago(date)
      return (
        <Fragment>
          <div
            key={p.poiID}
            className={`like-fragment`}
          >
            <img
              className='community-image'
              src={p.images[0].url}
              alt='img'
            />
            <p className='community-like'>
              <Typography
                variant='button'
                gutterBottom
                component={Link}
                to={`/poi/${p.poiID}`}
              >
                {p.title}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {p.private ? 'private' : 'public'}, created: {timeAgo}
              </Typography>
            </p>
          </div>
          <Divider />
        </Fragment>
      )
    })

    return (
      <Paper className='paper-w-w'>
        <Typography variant='h6' gutterBottom>
          Users & POIs:
        </Typography>
        <Typography variant='button' gutterBottom>
          Choose user:
        </Typography>
        <div id='users' className='cont'>
          {usersDiv}
        </div>
        <Typography variant='button' gutterBottom>
          {user === null ? '...' : user.name + "'s POIs:"}
        </Typography>
        <div id='pois' className='cont'>
          {poisDiv}
        </div>
      </Paper>
    )
  }
}

export default Users
