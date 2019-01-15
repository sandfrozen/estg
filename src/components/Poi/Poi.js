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
    await fetch(
      `https://localhost:5001/api/pois/${this.props.match.params.id}`
    )
      .then(response => response.json())
      .then(poi => {
        console.log('poi', poi)
        this.setState({
          poi,
          images: poi.images,
          likes: poi.likes,
          comments: poi.comments,
          fetching: null
        })
      })
      .catch(e => {
        console.log(e)
        this.setState({ fetching: e.message })
      })
  }

  render () {
    const {
      fetching,
      poi,
      images,
      likes,
      comments,
      liking
    } = this.state
    console.log(comments)
    if (fetching === null && poi.private === true) {
      return <Paper className='paper-w-w'>This POI is private.</Paper>
    } else if (fetching === null) {
      const timeAgo = ta.ago(poi.dateCreated)
      return (
        <CurrentUserConsumer>
          {({ user }) => (
            <Paper className='paper-w-w'>
              <div className='community-date'>added {timeAgo}</div>
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
              <PoiComments {...this.props} user={user} comments={comments} />
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
      return <Paper className='paper-w-w'>{fetching}</Paper>
    }
  }
}

export default Poi
