import React, { Component, Fragment } from 'react'

import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'

import './style.css'
import { imagePlaceholder } from '../../../helpers/helpers'
import Loading from '../../Loading/Loading'
import { Link } from 'react-router-dom'

class PoiGridListTile extends Component {
  userPoiInfoIconClick = () => {
  }

  onClick = userPoi => event => {
    this.props.handleClickOnPoi(userPoi)
  }
  render () {
    const { publicPois, clickedPoi } = this.props
    if (publicPois !== null && publicPois.length > 0) {
      const poisList = publicPois.map(p => {
        // const poiClassColor = clickedPoi === poi ? 'bw' : 'color'
        const poiClassShadow = clickedPoi === p ? 'no-shadow' : 'shadow'
        let imageUrl = imagePlaceholder
        try {
          imageUrl = p.images[0].url
        } catch {}
        return (
          <Fragment key={p.userPoiID}>
            <GridListTile className='my-col' onClick={this.onClick(p)}>
              <img src={imageUrl} alt={p.title} />
              <GridListTileBar
                title={p.title}
                subtitle={<span>by: {p.user.name}</span>}
                className='titleBar'
                actionIcon={
                  <IconButton
                    className='icon'
                  >
                    <InfoIcon />
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
      return this.props.fetching === true ? (
        <Loading text='Loading POIs...' />
      ) : (
        'Can not load POIs: ' + this.props.fetchingError
      )
    }
  }
}

export default PoiGridListTile
