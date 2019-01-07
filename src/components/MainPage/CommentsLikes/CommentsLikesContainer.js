import React, { Component, Fragment } from 'react'
import { Paper, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { CurrentUserConsumer } from '../../../context/CurrentUser.context'
import Likes from './Likes'
import Comments from './Comments'

class CommentsLikesContainer extends Component {

  render () {
    const { user } = this.props

    return (
      <Paper style={{ height: '100%' }}>
        <div className='community-cl'>
          <div className='community-headline'>
            Likes: <Link to={`/likes`}>show more</Link>
          </div>
          <div className='community-likes'>
            {user ? <Likes userId={user.userID} /> : 'login to see this content'}
          </div>
        </div>
        <div className='community-cl'>
          <div className='community-headline sec-headline'>
            Comments: <Link to={`/comments`}>show more</Link>
          </div>
          <div className='community-comments'>
            {user ? <Comments userId={user.userID} /> : 'login to see this content'}
          </div>
        </div>
      </Paper>
    )
  }
}

export default CommentsLikesContainer
