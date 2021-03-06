import React, { Component, Fragment } from 'react'
import { Button, Divider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import * as R from 'ramda'
import $ from 'jquery'

class PoiLikes extends Component {
  state = {
    likesVisible: false,
    liking: null,
    likes: []
  }

  componentDidMount () {
    this.setState({ likes: this.props.likes })
  }

  poiId = () => {
    return this.props.match.params.id
  }

  handleLikesDiv = () => {
    // this.setState({ likesVisible: !this.state.likesVisible })
    $('#likes').toggle(300)
  }

  handleLike = async (userID, likeID, event) => {
    this.setState({ liking: true })
    if (likeID === false) {
      await fetch('https://localhost:5001/api/likes', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          poiID: this.props.poi.poiID,
          userID: userID
        }) // body data type must match "Content-Type" header
      })
        .then(result => {
          if (result.status === 201) {
            return result.json()
          } else {
            throw new Error()
          }
        })
        .then(r => {
          this.setState({
            liking: null
          })
          this.fetchLikes()
        })
        .catch(e => {
          this.setState({ liking: e.message })
        })
    } else {
      await fetch('https://localhost:5001/api/likes/' + likeID, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        headers: {
          'Content-Type': 'application/json'
        } // body data type must match "Content-Type" header
      })
        .then(result => {
          if (result.status !== 200) {
            throw new Error()
          } else {
            this.setState({ liking: null })
            this.fetchLikes()
          }
        })
        .catch(e => {
          this.setState({ liking: e.message })
        })
    }
  }

  fetchLikes = async () => {
    await fetch(
      `https://localhost:5001/api/likes/forPoi/${this.poiId()}`
    )
      .then(response => response.json())
      .then(likes => {
        this.setState({
          likes
        })
      })
      .catch(e => {})
  }

  handleLiking = () => {
    this.setState({ liking: null })
  }

  render () {
    const { likesVisible, liking, likes } = this.state
    const { user, poi } = this.props
    const likeIndex = user
      ? R.findIndex(R.propEq('userID', user.userID))(likes)
      : -1
    const likeID = likeIndex !== -1 && likes[likeIndex].likeID // false or index

    return (
      <div className='space likes'>
        <Fragment>
          <Typography color='primary' variant='overline'>
            {likeID !== false ? 'You like this POI' : 'press like :)'}
          </Typography>

          <span onClick={this.handleLikesDiv}>{likes.length} 👍</span>
          {user ? (
            <Fragment>
              <Button
                onClick={() => this.handleLike(user.userID, likeID)}
                color='primary'
              >
                {likeID === false ? 'Like' : 'Unlike'}
              </Button>
              {liking !== null &&
                (liking === true ? (
                  'saving..'
                ) : (
                  <Chip
                    label={liking}
                    color='secondary'
                    variant='outlined'
                    onDelete={this.handleLiking}
                  />
                ))}
            </Fragment>
          ) : (
            <Button
              color='primary'
              component={Link}
              to={{
                pathname: '/login',
                state: { from: this.props.location }
              }}
            >
              Like it? Login first
            </Button>
          )}
          {user && user.userID === poi.userID && (
            <Button
              color='secondary'
              component={Link}
              className='to_right'
              to={`/edit-poi/${poi.poiID}`}
            >
              Edit POI
            </Button>
          )}
        </Fragment>

        {likes.length > 0 && (
          <div id='likes' className={'hidden_div'}>
            <Divider />
            People who likes this POI:
            <ul>
              {likes.map(like => (
                <li key={like.likeID}>{like.user.name}</li>
              ))}
            </ul>
          </div>
        )}
        <Divider />
      </div>
    )
  }
}

export default PoiLikes
