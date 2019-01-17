import React, { Component } from 'react'
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  FormGroup,
  Divider
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import './style.css'
import GoogleMapEdit from './GoogleMapEdit'
import PoiEditImages from './PoiEditImages'

class PoiEdit extends Component {
  state = {
    poi: null,
    fetching: true,
    saving: null,
    deleted: false
  }

  componentDidMount () {
    this.getPoi()
  }

  poiId = () => this.props.match.params.id

  getPoi = async () => {
    await fetch(`https://localhost:5001/api/pois/${this.poiId()}`)
      .then(response => response.json())
      .then(poi => {
        this.setState({
          title: poi.title,
          description: poi.description,
          latitude: poi.latitude,
          longitude: poi.longitude,
          _private: poi.private,

          poi,
          images: poi.images,
          likes: poi.likes,
          comments: poi.comments,
          fetching: null
        })
      })
      .catch(e => {
        this.setState({ fetching: e.message })
      })
  }

  putPoi = async () => {
    this.setState({ saving: true })

    const {
      title,
      description,
      _private,
      poi,
      latitude,
      longitude
    } = this.state

    await fetch('https://localhost:5001/api/pois/' + poi.poiID, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        poiID: poi.poiID,
        title: title,
        description: description,
        latitude: latitude,
        longitude: longitude,
        private: _private,
        userID: poi.userID,
        dateCreated: poi.dateCreated
      }) // body data type must match "Content-Type" header
    })
      .then(result => {
        // TODO: check result status
        this.setState({ saving: null })
      })
      .catch(e => {
        this.setState({ saving: e.message })
      })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      saving: 'Update'
    })
  }

  handleChangePrivate = () => {
    this.setState({ _private: !this.state._private, saving: 'Update' })
  }

  handleNewLatLng = (lat, lng) => {
    this.setState({ latitude: lat, longitude: lng, saving: 'Update' })
  }

  deletePoi = async () => {
    await fetch('https://localhost:5001/api/pois/' + this.poiId(), {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      headers: {
        'Content-Type': 'application/json'
      } // body data type must match "Content-Type" header
    })
      .then(result => {
        if (result.status !== 204) {
          new Error()
        }
        this.setState({ deleted: true })
      })
      .catch(e => {
        this.setState({ updating: e.message })
      })
  }

  render () {
    const { fetching, poi, deleted } = this.state
    if (deleted) {
      return <Redirect to='/' />
    }
    if (fetching === true) {
      return (
        <Paper className='paper-w-w'>
          <Loading text='Poi is loading...' />
        </Paper>
      )
    } else if (fetching === null) {
      const { saving, latitude, longitude } = this.state
      return (
        <CurrentUserConsumer>
          {({ user }) => (
            <Paper className='paper-w-w'>
              {user && user.userID !== poi.userID && <Redirect to='/' />}
              <Typography variant='h5' gutterBottom>
                POI Editing:
              </Typography>
              <FormGroup>
                <TextField
                  id='title'
                  label='Title'
                  value={this.state.title}
                  onChange={this.handleChange('title')}
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  id='description'
                  label='Description'
                  multiline
                  value={this.state.description}
                  onChange={this.handleChange('description')}
                  margin='normal'
                  variant='outlined'
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state._private}
                      onChange={() => this.handleChangePrivate()}
                      value={this.state._private}
                    />
                  }
                  label={this.state._private ? 'Private' : 'Public'}
                />
              </FormGroup>
              <p>Click to choose new localization</p>
              <div id='poi_map_edit'>
                <GoogleMapEdit
                  updateLatLng={this.handleNewLatLng}
                  lat={latitude}
                  lng={longitude}
                  editable={true}
                />
              </div>
              <Button
                onClick={() => {
                  this.putPoi()
                }}
                variant='contained'
                color='primary'
                disabled={saving === true}
              >
                {saving === null
                  ? 'Saved'
                  : saving === true
                    ? 'Saving...'
                    : saving}
              </Button>
              <Button
                component={Link}
                color='primary'
                to={`/poi/${this.poiId()}`}
              >
                Back
              </Button>
              <PoiEditImages
                userID={user ? user.userID : 1}
                poiID={poi.poiID}
              />
              <Divider />
              <br />
              <p>
                DANGER: if you press this button this POI and all related data
                (likes, comments, pois from paths) will be removed.
              </p>
              <Button
                onClick={() => {
                  this.deletePoi()
                }}
                variant='contained'
                color='secondary'
              >
                Delete POI
              </Button>
            </Paper>
          )}
        </CurrentUserConsumer>
      )
    } else {
      return <Paper className='paper-w-w'>{this.state.fetching}</Paper>
    }
  }
}

export default PoiEdit
