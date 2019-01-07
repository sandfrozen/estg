import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import './style.css'
import './community.css'
import GridList from '@material-ui/core/GridList'
import Paper from '@material-ui/core/Paper'
import PoiInfo from './PoiInfo/PoiInfo'
import PoiGridListTile from './PoiGridListTile/PoiGridListTile'
import NewsFeed from './NewsFeed/NewsFeed'
import Friends from './Friends/Friends'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import CommentsLikesContainer from './CommentsLikes/CommentsLikesContainer';

class MainPage extends Component {
  state = {
    center: {
      lat: 38.707738,
      lng: -9.132729
    },
    zoom: 11,
    clickedPoi: null,
    mapSize: 6,
    pois: null,
    fetching: true
  }

  componentDidMount () {
    this.fetchPois()
  }

  fetchPois = async () => {
    await fetch('https://localhost:5001/api/pois')
      .then(response => response.json())
      .then(pois => {
        this.setState({ pois, fetching: false })
      })
      .catch(() => {
        this.setState({ fetching: false })
      })
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
    const { clickedPoi, pois } = this.state
    return (
      <CurrentUserConsumer>
        {({ user }) => (
          <div className='root-main'>
            <Grid container>
              <Grid item md={6} xs={12} className='grid-item' id='map'>
                {/* <GoogleApiWrapper
              pois={pois}
              poi={clickedPoi}
              markerChanged={this.markerChanged}
            /> */}
              </Grid>

              <Grid item md={6} xs={12} className='grid-item' id='desc'>
                <Paper>
                  <PoiInfo poi={clickedPoi} />
                </Paper>
              </Grid>
            </Grid>

            <GridList className='gridList'>
              <PoiGridListTile
                pois={pois}
                clickedPoi={clickedPoi}
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
