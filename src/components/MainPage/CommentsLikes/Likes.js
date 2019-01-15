import React, { Component, Fragment } from 'react'
import { Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import ta from 'time-ago'

class Likes extends Component {
  state = {
    likes: null,
    fetching: true
  }

  componentDidMount () {
    this.fetchLikesForUser()
  }

  fetchLikesForUser = async () => {
    await fetch(`https://localhost:5001/api/likes/forUser/${this.props.userId}`)
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

        console.log('like', like)
        return (
          <Fragment key={like.likeID}>
            <div className='like-fragment'>
              <img
                className='community-image'
                src={
                  like.poi.images[0].url ||
                  'https://via.placeholder.com/150'
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
                <Link className='community-title' to={`/poi/${like.userPoiID}`}>
                  {like.poi.title}
                </Link>
              </p>
            </div>
            <Divider />
          </Fragment>
        )
      })
    }

    return <div>{divLikes}</div>
  }
}

export default Likes
