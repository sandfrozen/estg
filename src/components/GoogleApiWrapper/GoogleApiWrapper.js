import { KEY } from '../../secrets/googleMapsApi'
import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import './style.css'

const mapStyle = {
  borderRadius: 4,
  boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
}

const mapContainer = {
  width: '100%',
  height: '100%',
  position: 'relative'
}

export class MapContainer extends Component {
  render () {
    return (
      <Map
        google={this.props.google}
        zoom={13}
        containerStyle={mapContainer}
        style={mapStyle}
        initialCenter={{
          lat: 38.706936,
          lng: -9.136493
        }}
      >
        <Marker onClick={this.onMarkerClick} name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>POi name</h1>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

const LoadingContainer = props => <div style={{color: 'black'}}>Map is loading...</div>

export default GoogleApiWrapper({
  apiKey: KEY,
  LoadingContainer: LoadingContainer
})(MapContainer)
