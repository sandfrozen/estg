import React, { Component } from 'react'
import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

import './style.css'
import { imagePlaceholder } from '../../../helpers/helpers'

class PoiInfo extends Component {
  componentDidUpdate () {
    var poi = document.getElementById('poi_info')
    poi.scrollTop = poi.scrollHeight - poi.offsetHeight
  }

  render () {
    const { userPoi } = this.props

    if (userPoi === null) {
      return (
        <div className='poi_info' id='poi_info'>
          <div>
            <img
              className='poi_image lisbon_image'
              src='http://www.tourist-destinations.net/wp-content/uploads/2014/04/lisbon-view-bairro-alto.jpg'
              alt='lisbon'
            />
          </div>
          <div className='poi_title'>Lisbon</div>
          <div className='poi_desc'>
            is Portugal’s hilly, coastal capital city. From imposing São Jorge
            Castle, the view encompasses the old city’s pastel-colored
            buildings, Tagus Estuary and Ponte 25 de Abril suspension bridge.
            Nearby, the National Azulejo Museum displays 5 centuries of
            decorative ceramic tiles. Just outside Lisbon is a string of
            Atlantic beaches, from Cascais to Estoril.
          </div>
          <Button color='primary'>Click place to see more</Button>
        </div>
      )
    } else {
      let imageUrl = imagePlaceholder
      try {
        imageUrl = userPoi.images[0].url
      } catch {}
      console.log('userPoi', userPoi)
      return (
        <div className='poi_info' id='poi_info'>
          <div>
            <img className='poi_image' src={imageUrl} alt={userPoi.poi.title} />
          </div>
          <div className='poi_title'>{userPoi.poi.title}</div>
          <div className='poi_desc'>{userPoi.poi.description}</div>
          <Button
            color='primary'
            component={Link}
            to={`/poi/${userPoi.userPoiID}`}
          >
            Show more
          </Button>
        </div>
      )
    }
  }
}

export default PoiInfo
