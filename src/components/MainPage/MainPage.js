import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import Paper from '@material-ui/core/Paper'
import GoogleApiWrapper from '../GoogleApiWrapper/GoogleApiWrapper'
import PoiInfo from './PoiInfo/PoiInfo'
import PoiGridListTile from './PoiGridListTile/PoiGridListTile'
import NewsFeed from './NewsFeed/NewsFeed'
import Friends from './Friends/Friends'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import CommentsLikesContainer from './CommentsLikes/CommentsLikesContainer'
import './style.css'
import './community.css'

class MainPage extends Component {
  state = {
    center: {
      lat: 38.707738,
      lng: -9.132729
    },
    zoom: 11,
    clickedUserPoi: null,
    mapSize: 6,
    publicUsersPois: null,
    fetching: true
  }

  componentDidMount () {
    this.fetchPois()
  }

  fetchPois = async () => {
    await fetch('https://localhost:5001/api/userPois/public')
      .then(response => response.json())
      .then(publicUsersPois => {
        this.setState({ publicUsersPois, fetching: false })
      })
      .catch(() => {
        this.setState({ fetching: false })
      })
  }

  markerChanged = poi => {
    this.setState({ clickedUserPoi: poi })
  }

  handleMap = () => {
    // this.setState({ mapSize: 9 })
  }

  handleClickOnPoi = clickedUserPoi => {
    this.setState({ clickedUserPoi })
  }

  render () {
    const { clickedUserPoi, publicUsersPois } = this.state
    return (
      <CurrentUserConsumer>
        {({ user }) => (
          <div className='root-main'>
            <Grid container>
              <Grid item md={6} xs={12} className='grid-item' id='map'>
                <GoogleApiWrapper
                  publicUsersPois={publicUsersPois}
                  clickedUserPoi={clickedUserPoi}
                  markerChanged={this.markerChanged}
                />
              </Grid>

              <Grid item md={6} xs={12} className='grid-item' id='desc'>
                <Paper>
                  <PoiInfo clickedUserPoi={clickedUserPoi} />
                </Paper>
              </Grid>
            </Grid>

            <GridList className='gridList'>
              <PoiGridListTile
                publicUsersPois={publicUsersPois}
                clickedUserPoi={clickedUserPoi}
                handleClickOnPoi={this.handleClickOnPoi}
                fetching={this.state.fetching}
              />
            </GridList>
            <Grid container>
              <Grid item md={4} xs={12} className='grid-item' id='news'>
                <NewsFeed user={user} />
              </Grid>
              <Grid item md={4} xs={12} className='grid-item' id='comments'>
                <CommentsLikesContainer user={user} />
              </Grid>
              <Grid item md={4} xs={12} className='grid-item' id='friends'>
                <Friends user={user} />
              </Grid>
            </Grid>
          </div>
        )}
      </CurrentUserConsumer>
    )
  }
}

export default MainPage
