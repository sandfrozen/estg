import React, { Component, Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core'
import Loading from '../Loading/Loading'
import Carousel from './Carousel'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import PoiLikes from './PoiLikes'
import PoiComments from './PoiComments'
import GoogleMap from './GoogleMap'
import $ from 'jquery'
import ta from 'time-ago'

class Poi extends Component {
  state = {
    userPoi: null,
    fetching: '' // '' - fetching, null - ok, 'message' - fetch error
  }

  componentDidMount () {
    this.fetchPoi()
  }

  fetchPoi = async () => {
    await fetch(`https://localhost:5001/api/pois/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(poi => {
        this.setState({
          poi,
          images: poi.images,
          likes: poi.likes,
          comments: poi.comments,
          fetching: null
        })
      })
      .catch(e => {
        this.setState({ fetching: e.message })
      })
  }

  render () {
    const { fetching, poi, images, likes, comments, liking } = this.state
    if (fetching === null) {
      const timeAgo = ta.ago(poi.dateCreated)
      return (
        <CurrentUserConsumer>
          {({ user }) => (
            <Paper className='paper-w-w'>
              {(user && poi.private === true && poi.userID !== user.userID) ? (
                <Paper className='paper-w-w'>This POI is private.</Paper>
              ) : (
                <Fragment>
                  <div className='community-date'>added {timeAgo}, {poi.private ? 'private' : 'public'}</div>
                  <Typography variant='h5' gutterBottom align='center'>
                    {poi.title}
                  </Typography>
                  <Typography
                    color='primary'
                    variant='overline'
                    align='center'
                    gutterBottom
                  >
                    {'Author: '}
                    {user !== null && user.userID === poi.userID
                      ? 'You'
                      : poi.user.name}
                  </Typography>
                  <div className='carousel-cont'>
                    <Carousel images={images} />
                  </div>
                  <PoiLikes
                    user={user}
                    poi={poi}
                    likes={likes}
                    liking={liking}
                    fetchLikes={this.fetchLikesForUserPoi}
                    {...this.props}
                  />
                  <Typography variant='h6' gutterBottom>
                    Description:
                  </Typography>
                  <div className='space'>{poi.description}</div>
                  <div id='poi_map'>
                    <GoogleMap poi={poi} />
                  </div>
                  <Divider />
                  <PoiComments
                    {...this.props}
                    user={user}
                    comments={comments}
                  />
                </Fragment>
              )}
            </Paper>
          )}
        </CurrentUserConsumer>
      )
    } else if (fetching === '') {
      return (
        <Paper className='paper-w-w'>
          <Loading />
        </Paper>
      )
    } else {
      // error
      return <Paper className='paper-w-w'>{fetching}</Paper>
    }
  }
}

export default Poi
