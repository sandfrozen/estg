import React, { Component, Fragment } from 'react'
import { Divider, Chip } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ta from 'time-ago'

class PoiComments extends Component {
  state = {
    comments: [],
    count: 3,
    commenting: null
  }

  componentDidMount () {
    this.setState({ comments: this.props.comments })
  }
  setContent = e => {
    this.setState({ content: e.target.value })
  }

  addComment = async () => {
    console.log(this.refs.inputcontent.value)
    const content = this.refs.inputcontent.value
    if (content.length === 0) {
      return
    }
    const userID = this.props.user.userID
    const userPoiID = this.props.match.params.id
    this.setState({ commenting: true })
    await fetch('https://localhost:5001/api/comments', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: userID,
        userPoiID: userPoiID,
        content: content,
        dateCreated: new Date().toISOString(),
        dateEdited: new Date().toISOString()
      }) // body data type must match "Content-Type" header
    })
      .then(result => {
        if (result.status === 201) {
          return result.json()
        } else {
          new Error()
        }
      })
      .then(comment => {
        let { comments } = this.state
        comments.unshift(comment)
        this.setState({ comments, commenting: null })
        this.refs.inputcontent.value = ''
      })
      .catch(e => {
        this.setState({ commenting: e.message })
      })
  }

  handleCommenting = () => {
    this.setState({ commenting: null })
  }

  render () {
    const { user } = this.props
    const allComments = this.state.comments
    const { commenting } = this.state
    const comments = allComments

    return (
      <div className='space comments'>
        {user && (
          <p className='new-comment'>
            <Typography color='primary' variant='overline' gutterBottom>
              New comment:
            </Typography>

            <input
              ref='inputcontent'
              placeholder='Write something nice...'
              className='new-comment-text'
            />
            <Button onClick={() => this.addComment()} color='primary'>
              Add
            </Button>
            <br />
            {commenting === true ? (
              'saving...'
            ) : commenting === null ? (
              '.'
            ) : (
              <Chip
                label={commenting}
                color='secondary'
                variant='outlined'
                onDelete={this.handleCommenting}
              />
            )}
          </p>
        )}
        {!user && (
          <Button
            color='primary'
            component={Link}
            to={{
              pathname: '/login',
              state: { from: this.props.location }
            }}
          >
            Want write comment? Login first
          </Button>
        )}
        <div className='comments-list'>
          {comments.length === 0 && <p>No comments.</p>}
          {comments.length > 0 && (
            <Fragment>
              <br />
              <Typography variant='h6' gutterBottom>
                Comments:
              </Typography>

              {comments.map(comment => {
                const date = new Date(comment.dateCreated)
                const timeAgo = ta.ago(date)
                return (
                  <Fragment key={comment.commentID}>
                    <div className='like-fragment'>
                      <img
                        className='community-image'
                        src='https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png'
                        alt='poi'
                      />
                      <p className='community-like'>
                        <Typography
                          color='primary'
                          variant='overline'
                          gutterBottom
                        >
                          {user && comment.user.userID === user.userID
                            ? 'You'
                            : comment.user.name}
                          <span className='community-date'> {timeAgo}</span>
                        </Typography>
                        <span>{comment.content}</span>
                      </p>
                    </div>
                    <Divider variant='middle' />
                  </Fragment>
                )
              })}
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default PoiComments
