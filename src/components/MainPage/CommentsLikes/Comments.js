import React, { Component, Fragment } from 'react'
import { Divider, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import ta from 'time-ago'

class Comments extends Component {
  state = {
    comments: null,
    fetching: true
  }

  componentWillReceiveProps (nextProps, nextContex) {
    console.log('cr', nextProps.userId)
    if (nextProps.userId > 0) {
      this.fetchCommentsForUser(nextProps.userId)
    }
  }

  fetchCommentsForUser = async userId => {
    await fetch(`https://localhost:5001/api/comments/forUser/${userId}`)
      .then(result => result.json())
      .then(comments => {
        this.setState({ comments, fetching: false })
      })
      .catch(() => {
        this.setState({ fetching: false })
      })
  }

  render () {
    const { comments, fetching } = this.state
    const { userId } = this.props
    let divComments = fetching === true ? <Loading /> : 'no comments'

    if (comments !== null && comments.length > 0) {
      divComments = comments.map(comment => {
        const date = new Date(comment.dateCreated)
        const timeAgo = ta.ago(date)
        return (
          <Fragment key={comment.commentID}>
            <div className='like-fragment'>
              <img
                className='community-image'
                src={comment.poi.images[0].url}
                alt='poi'
              />
              <p className='community-like'>
                <span className='community-date'>{timeAgo}</span>
                <br />
                {userId === comment.userID ? (
                  'You'
                ) : (
                  <Link to={`/user/${comment.userID}`}>
                    {comment.user.name}
                  </Link>
                )}{' '}
                wrote a comment:{' '}
                <Link className='community-title' to={`/poi/${comment.poiID}`}>
                  {comment.poi.title}
                </Link>
                <br />
                <span className='community-comment'>{comment.content}</span>
              </p>
            </div>
            <Divider />
          </Fragment>
        )
      })
    }

    return (
      <Paper>
        <div className='community-cl'>
          <div className='community-headline sec-headline'>Comments:</div>
          <div className='community-comments'>
            {userId === 0 ? 'login to see this content' : divComments}
          </div>
        </div>
      </Paper>
    )
  }
}

export default Comments
