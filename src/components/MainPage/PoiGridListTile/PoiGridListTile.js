import React, { Component, Fragment } from 'react'

import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import './style.css'
import { imagePlaceholder } from '../../../helpers/helpers'
import Loading from '../../Loading/Loading';

class PoiGridListTile extends Component {
  onClick = poi => event => {
    this.props.handleClickOnPoi(poi)
  }
  render () {
    const { pois, clickedPoi } = this.props
    if (pois !== null && pois.length > 0) {
      const poisList = pois.map(poi => {
        // const poiClassColor = clickedPoi === poi ? 'bw' : 'color'
        const poiClassShadow = clickedPoi === poi ? 'no-shadow' : 'shadow'
        let imageUrl = imagePlaceholder
        try {
          imageUrl = poi.userPois[0].images[0].url
        } catch {}

        return (
          <Fragment key={poi.poiID}>
            <GridListTile className='my-col' onClick={this.onClick(poi)}>
              <img src={imageUrl} alt={poi.title} />
              <GridListTileBar
                title={poi.title}
                className='titleBar'
                actionIcon={
                  <IconButton>
                    <StarBorderIcon className='title' />
                  </IconButton>
                }
              />
              <div className={poiClassShadow} />
            </GridListTile>
          </Fragment>
        )
      })
      return <Fragment>{poisList}</Fragment>
    } else {
      return this.props.fetching === true ? <Loading /> : 'no images'
    }
  }
}

export default PoiGridListTile
