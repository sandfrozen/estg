import React, { Component, Fragment } from 'react'
import { Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Loading from '../../Loading/Loading';

class Likes extends Component {
  state = {
    likes: null,
    fetching: true
  }

  componentDidMount () {
    this.fetchLikesForUser()
  }

  fetchLikesForUser = async () => {
    console.log('likeff', this.props.userId)
    await fetch(
      `https://localhost:5001/api/likes/forUser/${this.props.userId}`
    )
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
    let divLikes = fetching === true ? <Loading /> : 'no likes'
    if (likes !== null && likes.length > 0) {
      divLikes = likes.map(like => (
        <Fragment key={like.likeID}>
          <div className='like-fragment'>
            <img
              className='community-image'
              src={like.userPoi.images[0].url || 'https://via.placeholder.com/150'}
              alt='poi'
            />
            <p className='community-like'>
              <span className='community-date'>{like.dateCreated}</span>
              <br />
              <Link
                to={`/user/${like.userID}`}
              >
                {like.user.name}
              </Link>{' '}
              👍 your place:{' '}
              <Link
                className='community-title'
                to={`/poi/${like.userPoiID}`}
              >
                {like.userPoi.poi.title}
              </Link>
            </p>
          </div>
          <Divider />
        </Fragment>
      ))
    }

    return <div>{divLikes}</div>
  }
}

export default Likes
