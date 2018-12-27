import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import './style.css'

class PoiInfo extends Component {

  componentDidUpdate () {
    var poi = document.getElementById('poi_info')
    poi.scrollTop = poi.scrollHeight - poi.offsetHeight
  }

  render () {
    const { poi } = this.props

    if (poi === null) {
      return (
        <div className='center'>
          <h3>Click place to see details</h3>
        </div>
      )
    } else {
      const path = `/poi/${poi.poiId}`
      return (
        <div className='poi_info' id='poi_info'>
          <div>
            <img className='poi_image' src={poi.image.filePath} alt={poi.title} />
          </div>
          <div className='poi_title'>{poi.title}</div>
          <div className='poi_desc'>{poi.description}</div>
          <Button color='primary' component={Link} to={path}>Show more</Button>
        </div>
      )
    }
  }
}

export default PoiInfo
