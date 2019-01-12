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
    console.log('userPoiInfoIconClick')
  }

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
        const link = '/poi/'+up.userPoiID
        const MyLink = <Link to={link}/>
        return (
          <Fragment key={up.userPoiID}>
            <GridListTile className='my-col' onClick={this.onClick(up)}>
              <img src={imageUrl} alt={up.poi.title} />
              <GridListTileBar
                title={up.poi.title}
                subtitle={<span>by: {up.user.name}</span>}
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
