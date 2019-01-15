import { KEY } from '../../secrets/googleMapsApi'
import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import './style.css'
import Loading from '../Loading/Loading';

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
    clickedPoi: null
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps.clickedPoi)
    this.setState({
      clickedPoi: nextProps.clickedPoi
    })
  }

  onMarkerClick = clickedPoi => e => {
    this.props.markerChanged(clickedPoi)
    this.setState({ clickedPoi })
  }

  render () {
    const publicPois = this.props.publicPois
    const clickedPoi = this.state.clickedPoi
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
    if (publicPois !== null) {
      markers = publicPois.map(p => {
        return (
          <Marker
            key={p.poiID}
            position={{ lat: p.latitude, lng: p.longitude }}
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
        {publicPois && markers}
        {clickedPoi && (
          <InfoWindow visible position={{ lat: clickedPoi.latitude, lng: clickedPoi.longitude }}>
            <div>
              <h3>{clickedPoi.title}</h3>
            </div>
          </InfoWindow>
        )}
      </Map>
    )
  }
}

const LoadingContainer = props => (
  <Paper>
    <Loading text='Map is loading...' />
  </Paper>
)

export default GoogleApiWrapper({
  apiKey: KEY,
  LoadingContainer: LoadingContainer
})(MapContainer)
