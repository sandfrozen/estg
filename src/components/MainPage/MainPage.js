import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import Paper from '@material-ui/core/Paper'
import GoogleMapMain from './GoogleMapMain/GoogleMapMain'
import PoiInfo from './PoiInfo/PoiInfo'
import PoiGridListTile from './PoiGridListTile/PoiGridListTile'
import NewsFeed from './NewsFeed/NewsFeed'
import Friends from './Friends/Friends'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import CommentsLikesContainer from './CommentsLikes/CommentsLikesContainer'
import './style.css'
import './community.css'
import Likes from './CommentsLikes/Likes'
import Comments from './CommentsLikes/Comments'

class MainPage extends Component {
  state = {
    center: {
      lat: 38.707738,
      lng: -9.132729
    },
    zoom: 11,
    clickedPoi: null,
    mapSize: 6,
    publicPois: [],
    fetching: true,
    fetchingError: ''
  }

  componentDidMount () {
    this.fetchPois()
  }

  fetchPois = async () => {
    this.setState({ fetching: true })
    let userID = 0
    try {
      const cookieUser = JSON.parse(localStorage.getItem('user'))
      userID = cookieUser.userID
    } catch (e) {}

    await fetch('https://localhost:5001/api/pois/public/' + userID)
      .then(response => response.json())
      .then(publicPois => {
        this.setState({ publicPois, fetching: false, fetchingError: '' })
      })
      .catch(e => {
        this.setState({ fetching: false, fetchingError: e.message })
      })
  }

  showLisbon = () => {
    this.setState({ clickedPoi: null })
  }

  markerChanged = poi => {
    this.setState({ clickedPoi: poi })
  }

  handleMap = () => {
    // this.setState({ mapSize: 9 })
  }

  handleClickOnPoi = clickedPoi => {
    this.setState({ clickedPoi })
  }

  render () {
    const { clickedPoi, publicPois } = this.state
    let { userId } = 0
    const cookieUser = JSON.parse(localStorage.getItem('user'))
    if (cookieUser) userId = cookieUser.userID
    return (
      <CurrentUserConsumer>
        {({ user }) => (
          <div className='root-main'>
            {console.log('user', user)}
            <Grid container>
              <Grid item md={6} xs={12} className='grid-item' id='map'>
                <GoogleMapMain
                  publicPois={publicPois}
                  clickedPoi={clickedPoi}
                  markerChanged={this.markerChanged}
                />
              </Grid>

              <Grid item md={6} xs={12} className='grid-item' id='desc'>
                <Paper>
                  <PoiInfo
                    clickedPoi={clickedPoi}
                    showLisbon={this.showLisbon}
                    reload={this.fetchPois}
                  />
                </Paper>
              </Grid>
            </Grid>

            <GridList className='gridList'>
              <PoiGridListTile
                publicPois={publicPois}
                clickedPoi={clickedPoi}
                handleClickOnPoi={this.handleClickOnPoi}
                fetching={this.state.fetching}
                fetchingError={this.state.fetchingError}
              />
            </GridList>
            <Grid container>
              <Grid item md={4} xs={12} className='grid-item' id='news'>
                <NewsFeed userId={userId} pois={publicPois} />
              </Grid>
              <Grid item md={4} xs={12} className='grid-item' id='likes'>
                <Likes userId={userId} />
              </Grid>
              <Grid item md={4} xs={12} className='grid-item' id='comments'>
                <Comments userId={userId} />
              </Grid>
            </Grid>
          </div>
        )}
      </CurrentUserConsumer>
    )
  }
}

export default MainPage
