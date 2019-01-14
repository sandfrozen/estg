import React, { Component, Fragment } from 'react'
import { Divider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'

class PoiComments extends Component {
  state = {
    comment: '',
    comments: [],
    count: 3,
    commenting: null
  }

  componentDidMount () {
    this.setState({ comments: this.props.comments })
  }
  setComment = e => {
    this.setState({ comment: e.target.value })
  }

  addComment = () => {
    if (this.state.comment.length === 0) {
      return
    }
    const userID = this.props.user.userID
    const userPoiID = this.props.match.params.id
    this.setState({ commenting: true })
    fetch('https://localhost:5001/api/comments', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: userID,
        userPoiID: userPoiID,
        content: this.state.comment,
        dateCreated: new Date().toISOString(),
        dateEdited: new Date().toISOString()
      }) // body data type must match "Content-Type" header
    })
      .then(result => {
        console.log('add comment', result)
        if (result.status === 201) {
          return result.json()
        } else {
          new Error()
        }
      })
      .then(comment => {
        let { comments } = this.state
        comments.push(comment)
        this.setState({ comments, commenting: null })
        this.refs.newcomment.value = ''
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
        {comments.length === 0 && <p>No comments.</p>}
        <div className='comments-list'>
          {comments.length > 0 && (
            <div>
              <br />
              <Typography variant='h6' gutterBottom>
                Comments:
              </Typography>

              {comments.map(comment => {
                const date = new Date(comment.dateCreated)
                const now = new Date()
                const formattedDate =
                  now.getTime() - date.getTime() > 60000
                    ? date.getDate() +
                      '.' +
                      date.getMonth() +
                      1 +
                      '.' +
                      date.getFullYear() +
                      ' at ' +
                      date.getHours() +
                      ':' +
                      date
                        .getMinutes()
                        .toString()
                        .padStart(2, '0')
                    : 'few seconds ago'
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
                          {comment.user.userID === user.userID
                            ? 'You'
                            : comment.user.name}
                          <span className='community-date'>
                            {' '}
                            {formattedDate}
                          </span>
                        </Typography>
                        <span>{comment.content}</span>
                      </p>
                    </div>
                    <Divider variant='middle'/>
                  </Fragment>
                )
              })}
            </div>
          )}
        </div>
        <p className='new-comment'>
          <Typography color='primary' variant='overline' gutterBottom>
            New comment:
          </Typography>

          <input
            ref='newcomment'
            placeholder='Write something nice...'
            className='new-comment-text'
            onChange={this.setComment}
          />
          <Button onClick={() => this.addComment()} color='primary'>
            Add
          </Button>
          {commenting === true
            ? 'saving...'
            : commenting === null
              ? ''
              : <span onClick={this.handleCommenting}>{commenting}</span>}
        </p>
      </div>
    )
  }
}

export default PoiComments
