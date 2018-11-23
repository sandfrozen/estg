import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import './style.css'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import GoogleMapReact from 'google-map-react'
import { KEY } from '../../secrets/googleMapsApi'

const pois = [
  {
    poiid: 1,
    title: 'Praça do Comércio',
    description: 'Lorem Ipsum',
    latitude: '38.7075293',
    longitude: '-9.1365861',
    image: {
      imageid: 11,
      title: 'My Praça do Comércio',
      filePath: 'https://www.visitlisboa.com/sites/default/files/md-slider-image/2_33.jpg',
      private: false,
      datecreated: '2018-11-11'
    }
  },
  {
    poiid: 2,
    title: 'Ponte 25 de Abril',
    description: 'Lorem Ipsum',
    latitude: '38.6904756',
    longitude: '-9.1773516',
    image: {
      imageid: 10,
      title: 'My Ponte 25 de Abril',
      filePath: 'https://www.bem-vindo-a-lisboa.com.br/wp-content/uploads/2017/07/tour-lisboa-belem-ponte-25-de-abril-e-cristo-rei-o-que-esperar-lisboa.jpg',
      private: false,
      datecreated: '2018-11-10'
    }
  },
  {
    poiid: 3,
    title: 'Torre de Belém',
    description: 'Lorem Ipsum',
    latitude: '38.6916389',
    longitude: '-9.2158002',
    image: {
      imageid: 9,
      title: 'My PTorre de Belém',
      filePath: 'http://www.patrimoniocultural.gov.pt/static/data/cache/f8/72/f872e73eef92ad2d755293b95634a4a6.jpg',
      private: false,
      datecreated: '2018-11-09'
    }
  },
  {
    poiid: 4,
    title: 'Castelo de S. Jorge',
    description: 'Lorem Ipsum',
    latitude: '38.7075293',
    longitude: '-9.1365861',
    image: {
      imageid: 8,
      title: 'My Castelo de S. Jorge',
      filePath: 'https://www.360meridianos.com/wp-content/uploads/2014/10/Castelo-de-São-Jorge-Lisboa.jpg',
      private: false,
      datecreated: '2018-11-08'
    }
  }
]

class MainPage extends Component {
  state = {
    center: {
      lat: 38.707738, 
      lng: -9.132729
    },
    zoom: 11 
  }
  render () {
    return (
      <div className='root-main'>
        <Grid container>
          <Grid item xs={6} className='grid-item'>
            <Paper id='map'>
              <GoogleMapReact
                bootstrapURLKeys={{ key: KEY }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
              >
              </GoogleMapReact>
            </Paper>
          </Grid>
          <Grid item xs={6} className='grid-item'>
            <Paper id='desc'>
              <Typography component='div'>
                {pois[0].title}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <GridList className='gridList'>
          {pois.map(tile => (
            <GridListTile key={tile.poiid} className='my-col'>
              <img src={tile.image.filePath} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                className='titleBar title'
                actionIcon={
                  <IconButton>
                    <StarBorderIcon className='title' />
                  </IconButton>
                }
              />
              <div className='overlay' />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

export default MainPage
