import React, { Component, Fragment } from 'react';
import ta from 'time-ago'
import { Link } from 'react-router-dom'
import { Divider } from '@material-ui/core'

class UserPaths extends Component {
  render() {
    const { paths, editable } = this.props

    const pathsDiv =
      paths.length === 0
        ? '0 Paths'
        : paths.map(p => {
          const date = new Date(p.dateCreated)
          const timeAgo = ta.ago(date)
          return (
            <Fragment key={p.poiID}>
              <div className='like-fragment'>
                <img
                  className='community-image'
                  src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjywV2djkSMCM9VH9spPig9vyJOtlyk9LiNIrOtxv74s0YKz4feg'}
                  alt='path'
                />
                <p className='community-like'>
                  <span className='community-date'>Created: {timeAgo}</span>
                  <br />
                  <Link className='community-title' to={`/path/${p.pathID}`}>
                    {p.title}
                  </Link>
                  <br />
                  <span className='community-comment'>Includes {p.pathPois.length} POIs</span>
                </p>
              </div>
              <Divider/>
            </Fragment>
          )
        })
    return (
      <div>
        {editable && <p>Your Paths:</p>}
        {!editable && <p>User's Paths:</p>}
        {pathsDiv}
      </div>
    );
  }
}

export default UserPaths;