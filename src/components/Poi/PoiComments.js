import React, { Component, Fragment } from 'react'
import { Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'

class PoiComments extends Component {
  render () {
    const { comments } = this.props
    return (
      <div className='space comments'>
        {comments.length === 0 && <p>No comments.</p>}
        {comments.length > 0 && (
          <div>
            Comments:
            {comments.map(comment => {
              console.log(comment)
              const date = new Date(comment.dateCreated)
              const formattedDate =
                date.getDate() +
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
              return (
                <Fragment key={comment.commentID}>
                  <div className='like-fragment'>
                    <img
                      className='community-image'
                      src='https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png'
                      alt='poi'
                    />
                    <p className='community-like'>
                      <span className='community-date'>{formattedDate}</span>
                      <br />
                      {comment.user.name}
                      <br />
                      <span className='community-comment'>
                        {comment.content}
                      </span>
                    </p>
                  </div>
                  <Divider />
                </Fragment>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

export default PoiComments
