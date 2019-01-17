import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
  Paper,
  Typography,
  FormGroup,
  TextField,
  FormControlLabel,
  Switch
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import GoogleMapEdit from './GoogleMapEdit'
import PoiEditImages from './PoiEditImages'
import $ from 'jquery'
import ta from 'time-ago'
import './style.css'

class NewPoi extends Component {
  state = {
    userID: 0,
    poiID: 0,
    title: '',
    description: '',
    _private: false,
    latitude: 38.706936,
    longitude: -9.151234,
    saved: false,
    dateCreated: false
  }

  componentDidMount () {
    const cookieUser = JSON.parse(localStorage.getItem('user'))
    const userID = cookieUser.userID
    this.setState({ userID })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleChangePrivate = () => {
    this.setState({ _private: !this.state._private })
  }

  handleNewLatLng = (lat, lng) => {
    this.setState({ latitude: lat, longitude: lng })
  }

  postPoi = async () => {
    const {
      title,
      description,
      _private,
      userID,
      latitude,
      longitude
    } = this.state

    if (title.length > 0 && description.length > 0) {
      this.setState({ saved: null })
      await fetch('https://localhost:5001/api/pois', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description,
          latitude: latitude,
          longitude: longitude,
          private: _private,
          userID: userID,
          dateCreated: new Date(Date.now())
        })
      })
        .then(result => {
          // TODO: check result status
          if (result.status !== 201) {
            throw Error()
          }
          return result.json()
        })
        .then(poi => {
          const d = new Date(poi.dateCreated)
          this.setState({ saved: true, poiID: poi.poiID, dateCreated: d })
          $('#edit-images').toggle()
        })
        .catch(e => {
          this.setState({ saved: e.message })
        })
    }
  }

  render () {
    const { userID, poiID, latitude, longitude, saved, dateCreated } = this.state
    return (
      <Paper className='paper-w-w'>
        <Typography variant='h5' gutterBottom>
          {dateCreated ? 'POI Added: ' + dateCreated : 'Add new POI:'}
        </Typography>
        <FormGroup>
          <TextField
            id='title'
            label='Title'
            value={this.state.title}
            onChange={this.handleChange('title')}
            margin='normal'
            variant='outlined'
            disabled={saved}
          />
          <TextField
            id='description'
            label='Description'
            multiline
            value={this.state.description}
            onChange={this.handleChange('description')}
            margin='normal'
            variant='outlined'
            disabled={saved}
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state._private}
                onChange={() => this.handleChangePrivate()}
                value={this.state._private}
                disabled={saved}
              />
            }
            label={this.state._private ? 'Private' : 'Public'}
          />
        </FormGroup>
        {!saved && <p>Click to choose localization</p>}
        <div id='poi_map_edit'>
          <GoogleMapEdit
            updateLatLng={this.handleNewLatLng}
            lat={latitude}
            lng={longitude}
            editable={!saved}
          />
        </div>
        <Button
          onClick={() => {
            this.postPoi()
          }}
          variant='contained'
          color='primary'
          disabled={saved}
        >
          {saved === false ? 'Save' : saved === true ? 'Saved' : saved === null ? 'Saving...' : 'Try again'}
        </Button>
        <Button
          component={Link}
          disabled={!saved}
          color='primary'
          to={`/poi/${this.state.poiID}`}
        >
          Show poi
        </Button>
        <div id='edit-images'>
          <PoiEditImages userID={userID} poiID={poiID} />
        </div>
      </Paper>
    )
  }
}

export default NewPoi
