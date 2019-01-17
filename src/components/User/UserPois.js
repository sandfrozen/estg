import React, { Component, Fragment } from 'react'
import ta from 'time-ago'
import { Link } from 'react-router-dom'
import { Divider } from '@material-ui/core'

class UserPois extends Component {
  render () {
    const { editable, pois } = this.props
    const poisDiv =
      pois.length === 0
        ? '0 POIs'
        : pois.map(poi => {
          const date = new Date(poi.dateCreated)
          const timeAgo = ta.ago(date)
          return (
            <Fragment key={poi.poiID}>
              <div className='like-fragment'>
                <img
                  className='community-image'
                  src={poi.images[0].url }
                  alt='poi'
                />
                <p className='community-like'>
                  <span className='community-date'>Created: {timeAgo}, {poi.private ? 'private' : 'public'}</span>
                  <br />
                  <Link className='community-title' to={`/poi/${poi.poiID}`}>
                    {poi.title}
                  </Link>
                  <br />
                  <span className='community-comment'>{poi.content}</span>
                </p>
              </div>
              <Divider />
            </Fragment>
          )
        })
    return (
      <div>
        {editable && <p>Your POIs:</p>}
        {!editable && <p>User's POIs:</p>}
        {poisDiv}
      </div>
    )
  }
}

export default UserPois
