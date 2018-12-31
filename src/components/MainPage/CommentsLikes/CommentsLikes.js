import React, { Component, Fragment } from 'react'
import { Paper, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'

const likes = [
  {
    likeId: 1,
    user: {
      userId: 1,
      name: 'Tomek B'
    },
    poi: {
      poiId: 1,
      title: 'My Praça do Comércio'
    },
    date: '2018-12-24 12:30:32'
  },
  {
    likeId: 2,
    user: {
      userId: 2,
      name: 'Adam C'
    },
    poi: {
      poiId: 1,
      title: 'My Praça do Comércio'
    },
    date: '2018-12-23 20:12:12'
  },
  {
    likeId: 3,
    user: {
      userId: 3,
      name: 'Marek D'
    },
    poi: {
      poiId: 1,
      title: 'My Praça do Comércio'
    },
    date: '2018-12-30 9:40:01'
  },
  {
    likeId: 4,
    user: {
      userId: 4,
      name: 'Agata X'
    },
    poi: {
      poiId: 1,
      title: 'My Praça do Comércio'
    },
    date: '2018-12-29 13:12:59'
  }
]
const comments = [
  {
    commentId: 1,
    user: {
      userId: 1,
      name: 'Tomek B'
    },
    poi: {
      poiId: 1,
      title: 'My Praça do Comércio'
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2018-12-24 12:30:32'
  },
  {
    commentId: 2,
    user: {
      userId: 2,
      name: 'Michał C'
    },
    poi: {
      poiId: 1,
      title: 'My Praça do Comércio'
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2018-12-30 20:03:42'
  },
  {
    commentId: 3,
    user: {
      userId: 1,
      name: 'Tomek B'
    },
    poi: {
      poiId: 1,
      title: 'My Praça do Comércio'
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2018-12-12 9:15:23'
  },
  {
    commentId: 4,
    user: {
      userId: 1,
      name: 'Tomek B'
    },
    poi: {
      poiId: 1,
      title: 'My Praça do Comércio'
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2018-12-29 10:55:42'
  },
  {
    commentId: 5,
    user: {
      userId: 4,
      name: 'Frank L'
    },
    poi: {
      poiId: 2,
      title: 'Ponte de Lima'
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2018-12-02 8:17:54'
  }
]
class CommentsLikes extends Component {
  render () {
    const likesDiv = likes.map(like => (
      <Fragment>
        <div className='like-fragment'>
          <img
            className='community-image'
            src='https://via.placeholder.com/150'
            alt='poi'
          />
          <p className='community-like'>
            <span className='community-date'>{like.date}</span>
            <br />
            <Link to={`/user/${like.user.name}-${like.user.userId}`}>
              {like.user.name}
            </Link>{' '}
            👍 your place:{' '}
            <Link
              className='community-title'
              to={`/poi/${like.poi.title}-${like.poi.poiId}`}
            >
              {like.poi.title}
            </Link>
          </p>
        </div>
        <Divider />
      </Fragment>
    ))

    const commentsDiv = comments.map(comment => (
      <Fragment>
        <div className='like-fragment'>
          <img
            className='community-image'
            src='https://via.placeholder.com/150'
            alt='poi'
          />
          <p className='community-like'>
            <span className='community-date'>{comment.date}</span>
            <br />
            <Link to={`/user/${comment.user.name}-${comment.user.userId}`}>
              {comment.user.name}
            </Link>{' '}
            ✏️ a comment:{' '}
            <Link
              className='community-title'
              to={`/poi/${comment.poi.title}-${comment.poi.poiId}`}
            >
              {comment.poi.title}
            </Link>
            <br />
            <span className='community-comment'>{comment.content}</span>
          </p>
        </div>
        <Divider />
      </Fragment>
    ))
    return (
      <Paper style={{height: '100%'}}>
        <div className='community-cl'>
          <div className='community-headline'>Likes: <Link to={`/likes`}>show more</Link></div>
          <div className='community-likes'>
            {likesDiv}
          </div>
        </div>
        <div className='community-cl'>
          <div className='community-headline sec-headline'>Comments: <Link to={`/comments`}>show more</Link></div>
          <div className='community-comments'>
            {commentsDiv}
          </div>
        </div>
      </Paper>
    )
  }
}

export default CommentsLikes
