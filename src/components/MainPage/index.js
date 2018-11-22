import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import './style.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import image from './praca.jpg'

const pois = [
  {
    poiid: 1,
    title: 'Praça do Comércio',
    description: 'Lorem Ipsum',
    latitude: '38.7075293',
    longitude: '-9.1365861',
    image: {
      imageid: 1,
      title: 'My Praça do Comércio',
      filePath: './praca.jpg',
      private: false,
      datecreated: '2018-11-11'
    }
  },
  {
    poiid: 2,
    title: 'Praça do Comércio',
    description: 'Lorem Ipsum',
    latitude: '38.7075293',
    longitude: '-9.1365861',
    image: {
      imageid: 1,
      title: 'My Praça do Comércio',
      filePath: './praca.jpg',
      private: false,
      datecreated: '2018-11-11'
    }
  },
  {
    poiid: 3,
    title: 'Praça do Comércio',
    description: 'Lorem Ipsum',
    latitude: '38.7075293',
    longitude: '-9.1365861',
    image: {
      imageid: 1,
      title: 'My Praça do Comércio',
      filePath: './praca.jpg',
      private: false,
      datecreated: '2018-11-11'
    }
  },
  {
    poiid: 4,
    title: 'Praça do Comércio',
    description: 'Lorem Ipsum',
    latitude: '38.7075293',
    longitude: '-9.1365861',
    image: {
      imageid: 1,
      title: 'My Praça do Comércio',
      filePath: './praca.jpg',
      private: false,
      datecreated: '2018-11-11'
    }
  }
]

class MainPage extends Component {
  render () {
    return (
      <div className='root'>
        <Grid container spacing={1} className='pois-container'>
          <Grid item xs={3} className='pois-mini'>
            {pois.map(poi => (
              <div className='poi-mini'>
                {poi.title}
              </div>
            ))}
          </Grid>
          <Grid item xs={6}>
            <Paper className='paper' id='map'>Map</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className='paper'>Desc</Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default MainPage
