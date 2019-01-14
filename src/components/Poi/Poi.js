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
      `https://localhost:5001/api/userPois/${this.props.match.params.id}`
    )
      .then(response => response.json())
      .then(userPoi => {
        console.log('user', userPoi)
        this.setState({
          userPoi,
          poi: userPoi.poi,
          images: userPoi.images,
          likes: userPoi.likes,
          comments: userPoi.comments,
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
      userPoi,
      fetching,
      poi,
      images,
      likes,
      comments,
      liking
    } = this.state
    if (fetching === null && userPoi.private === true) {
      return <Paper className='paper-w-w'>This POI is private.</Paper>
    } else if (fetching === null) {
      return (
        <CurrentUserConsumer>
          {({ user }) => (
            <Paper className='paper-w-w'>
              <Typography
                component='h2'
                variant='headline'
                align='center'
                gutterBottom
              >
                {poi.title}
              </Typography>
              <Typography
                color='primary'
                variant='overline'
                align='center'
                gutterBottom
              >
                {'Author: '}
                {user !== null && user.userID === userPoi.userID
                  ? 'You'
                  : userPoi.user.name}
              </Typography>
              <div className='equal_container'>
                <div className='equal_item'><GoogleMap poi={poi} /></div>
                <div className='equal_item'><Carousel images={images} /></div>
              </div>
              <div id='poi_map'>
                
              </div>
              
              <Divider />
              <PoiLikes
                user={user}
                userPoi={userPoi}
                likes={likes}
                liking={liking}
                fetchLikes={this.fetchLikesForUserPoi}
                {...this.props}
              />
              <Typography component='h3' variant='headline' gutterBottom>
                Description:
              </Typography>
              <div className='space'>{poi.description}</div>
              <Divider />
              <PoiComments comments={comments} />
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
