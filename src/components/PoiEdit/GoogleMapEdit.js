import { KEY } from '../../secrets/googleMapsApi'
import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import Paper from '@material-ui/core/Paper'
import './style.css'
import Loading from '../Loading/Loading'

const mapStyle = {
  borderRadius: 4,
  boxShadow:
    '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
}

const mapContainer = {
  width: '100%',
  height: '100%',
  position: 'relative'
}

export class MapContainer extends Component {
  onMapClicked = (props, map, e) => {
    if (this.props.editable) {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      console.log('m', lat, lng)
      this.props.updateLatLng(lat, lng)
    }
  }

  render () {
    const { lat, lng } = this.props
    return (
      <Map
        google={this.props.google}
        zoom={12}
        containerStyle={mapContainer}
        style={mapStyle}
        initialCenter={{
          lat,
          lng
        }}
        onClick={this.onMapClicked}
      >
        <Marker position={{ lat, lng }} />
      </Map>
    )
  }
}

const LoadingContainer = props => <Loading text='Map is loading...' />

export default GoogleApiWrapper({
  apiKey: KEY,
  LoadingContainer: LoadingContainer
})(MapContainer)
