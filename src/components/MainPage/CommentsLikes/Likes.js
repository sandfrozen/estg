import React, { Component, Fragment } from 'react'
import { Divider, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import ta from 'time-ago'

class Likes extends Component {
  state = {
    likes: null,
    fetching: true
  }

  componentWillReceiveProps (nextProps, nextContex) {
    console.log('lr', nextProps.userId)
    if (nextProps.userId > 0) {
      this.fetchLikesForUser(nextProps.userId)
    }
  }

  fetchLikesForUser = async userId => {
    await fetch(`https://localhost:5001/api/likes/forUser/${userId}`)
      .then(result => result.json())
      .then(likes => {
        this.setState({ likes, fetching: false })
      })
      .catch(() => {
        this.setState({ fetching: false })
      })
  }

  render () {
    const { likes, fetching } = this.state
    const { userId } = this.props

    let divLikes = fetching === true ? <Loading /> : 'no likes'
    if (likes !== null && likes.length > 0) {
      divLikes = likes.map(like => {
        const date = new Date(like.dateCreated)
        const timeAgo = ta.ago(date)
        return (
          <Fragment key={like.likeID}>
            <div className='like-fragment'>
              <img
                className='community-image'
                src={
                  like.poi.images[0].url || 'https://via.placeholder.com/150'
                }
                alt='poi'
              />
              <p className='community-like'>
                <span className='community-date'>{timeAgo}</span>
                <br />
                {userId === like.userID ? (
                  'You'
                ) : (
                  <Link to={`/user/${like.userID}`}>{like.user.name}</Link>
                )}{' '}
                liked your place:{' '}
                <Link className='community-title' to={`/poi/${like.poiID}`}>
                  {like.poi.title}
                </Link>
              </p>
            </div>
            <Divider />
          </Fragment>
        )
      })
    }

    return (
      <Paper style={{ height: '100%' }}>
        <div className='community-cl'>
          <div className='community-headline'>Likes:</div>
          <div className='community-likes'>
            {userId === 0 ? 'login to see this content' : divLikes}
          </div>
        </div>
      </Paper>
    )
  }
}

export default Likes
