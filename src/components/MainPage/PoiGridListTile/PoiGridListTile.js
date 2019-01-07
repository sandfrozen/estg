import React, { Component, Fragment } from 'react'

import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import './style.css'
import { imagePlaceholder } from '../../../helpers/helpers'
import Loading from '../../Loading/Loading';

class PoiGridListTile extends Component {
  onClick = userPoi => event => {
    this.props.handleClickOnPoi(userPoi)
  }
  render () {
    const { publicUsersPois, clickedUserPoi } = this.props
    if (publicUsersPois !== null && publicUsersPois.length > 0) {
      const poisList = publicUsersPois.map(up => {
        // const poiClassColor = clickedPoi === poi ? 'bw' : 'color'
        const poiClassShadow = clickedUserPoi === up ? 'no-shadow' : 'shadow'
        let imageUrl = imagePlaceholder
        try {
          imageUrl = up.images[0].url
        } catch {}

        return (
          <Fragment key={up.userPoiID}>
            <GridListTile className='my-col' onClick={this.onClick(up)}>
              <img src={imageUrl} alt={up.poi.title} />
              <GridListTileBar
                title={up.poi.title}
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
