import React, { Component, Fragment } from 'react'

import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import './style.css'

class PoiGridListTile extends Component {
  onClick = poi => event => {
    this.props.handleClickOnPoi(poi)
  }

  render () {
    const { pois } = this.props
    if (pois === null) {
      return <div>Loading..</div>
    } else {
      console.log(pois)
      const poisList = pois.map(poi => (
        <GridListTile
          key={poi.poiId}
          className='my-col'
          onClick={this.onClick(poi)}
        >
          <img src={poi.image.filePath} alt={poi.title} />
          <GridListTileBar
            title={poi.title}
            className='titleBar'
            actionIcon={
              <IconButton>
                <StarBorderIcon className='title' />
              </IconButton>
            }
          />
          <div className='shadow' />
        </GridListTile>
      ))
      return <Fragment>{poisList}</Fragment>
    }
  }
}

export default PoiGridListTile
