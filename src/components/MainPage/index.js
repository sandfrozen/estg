import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import './style.css'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'

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
      filePath: 'https://www.visitlisboa.com/sites/default/files/md-slider-image/2_33.jpg',
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
      filePath: 'https://www.visitlisboa.com/sites/default/files/md-slider-image/2_33.jpg',
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
      filePath: 'https://www.visitlisboa.com/sites/default/files/md-slider-image/2_33.jpg',
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
      filePath: 'https://www.visitlisboa.com/sites/default/files/md-slider-image/2_33.jpg',
      private: false,
      datecreated: '2018-11-11'
    }
  }
]

class MainPage extends Component {
  render () {
    return (
      <div className='root-main'>
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
              <div className='overlay'>
              </div>
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

export default MainPage
