import React, { Component, Fragment } from 'react'
import { Paper, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ta from 'time-ago'

class NewsFeed extends Component {
  render () {
    const { pois } = this.props
    const { userId } = this.props
    let divNews = 'no news'

    if (pois !== null && pois.length > 0) {
      divNews = pois.map(poi => {
        const date = new Date(poi.dateCreated)
        const timeAgo = ta.ago(date)
        return (
          <Fragment key={poi.poiID}>
            <div className='like-fragment'>
              <img
                className='community-image'
                src={poi.images[0].url}
                alt='poi'
              />
              <p className='community-like'>
                <span className='community-date'>{timeAgo}</span>
                <br />
                {userId === poi.userID ? (
                  'You'
                ) : (
                  <Link to={`/user/${poi.userID}`}>{poi.user.name}</Link>
                )}{' '}
                added new POI:{' '}
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
    }

    return (
      <Paper>
        <div className='community-cl'>
          <div className='community-headline sec-headline'>POI News:</div>
          <div className='community-comments'>{divNews}</div>
        </div>
      </Paper>
    )
  }
}

export default NewsFeed
