import { KEY } from '../../secrets/googleMapsApi'
import React, { Component, Fragment } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
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
  constructor (props) {
    super(props)

    this.state = {
      pois: this.props.pois,
      poi: this.props.poi
    }
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
    const pois = this.state.pois
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

    const markers = pois.map(item => {
      return (
        <Marker
          key={item.poiId}
          position={{ lat: item.lat, lng: item.lng }}
          onClick={this.onMarkerClick(item)}
        />
      )
    })

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
        {pois && markers}
        {poi &&
          <InfoWindow visible position={{ lat: poi.lat, lng: poi.lng }}>
            <div>
              <h3>{poi.title}</h3>
            </div>
          </InfoWindow>}
      </Map>
    )
  }
}

const LoadingContainer = props => (
  <Paper>
    <div style={{ flexGrow: 1 }}>
      Map is loading...
      <LinearProgress />
    </div>
  </Paper>
)

export default GoogleApiWrapper({
  apiKey: KEY,
  LoadingContainer: LoadingContainer
})(MapContainer)
