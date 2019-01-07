import { KEY } from '../../secrets/googleMapsApi'
import React, { Component, Fragment } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import './style.css'

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

  state = {
    poi: null
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      poi: nextProps.poi
    })
  }

  onMarkerClick = poi => e => {
    this.props.markerChanged(poi)
    this.setState({ poi })
  }

  render () {
    const publicUsersPois = this.props.publicUsersPois
    const poi = this.state.poi
    // let pois = []
    // if (poi) {
    //   poiz.forEach(p => {
    //     if (p !== poi) {
    //       pois.push(p)
    //     }
    //   })
    // } else {
    //   pois = poiz
    // }
    let markers = null
    if (publicUsersPois !== null) {
      markers = publicUsersPois.map(p => {
        return (
          <Marker
            key={p.userPoiID}
            position={{ lat: p.poi.latitude, lng: p.poi.longitude }}
            onClick={this.onMarkerClick(p)}
          />
        )
      })
    }

    // const center_to_poi = poi && { lat: poi.lat, lng: poi.lng }
    // center={center_to_poi}
    return (
      <Map
        google={this.props.google}
        zoom={12}
        containerStyle={mapContainer}
        style={mapStyle}
        initialCenter={{
          lat: 38.706936,
          lng: -9.151234
        }}
      >
        {publicUsersPois && markers}
        {poi && (
          <InfoWindow visible position={{ lat: poi.latitude, lng: poi.longitude }}>
            <div>
              <h3>{poi.title}</h3>
            </div>
          </InfoWindow>
        )}
      </Map>
    )
  }
}

const LoadingContainer = props => (
  <Paper>
    <div style={{ flexGrow: 1, padding: 16 }}>
      Map is loading...
      <LinearProgress />
    </div>
  </Paper>
)

export default GoogleApiWrapper({
  apiKey: KEY,
  LoadingContainer: LoadingContainer
})(MapContainer)
