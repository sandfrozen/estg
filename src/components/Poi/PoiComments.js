import React, { Component } from 'react'

class PoiComments extends Component {
  
  render () {
    const { comments } = this.props
    return (
      <div className='space comments'>
        {comments.length === 0 && <p>No comments.</p>}
        {comments.length > 0 && (
          <div>
            Comments:
            {comments.map(comment => (
              <div key={comment.commentID}>
                <p>
                  {comment.user.name} {comment.dateCreated}
                </p>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default PoiComments
