import React, { Component } from 'react'
import Loading from '../Loading/Loading'
import { TextField, Button, FormGroup, Divider } from '@material-ui/core'
import EditImageForm from './EditImageForm'

class PoiEditImages extends Component {
  state = {
    images: [],
    fetching: null,
    newUrl: '',
    newTitle: '',
    saving: null
  }

  componentDidMount () {
    this.getImages()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  getImages = async () => {
    this.setState({ fetching: true })
    const poiID = this.props.poiID
    await fetch(`https://localhost:5001/api/images/forPoi/${poiID}`)
      .then(response => response.json())
      .then(images => {
        this.setState({
          images,
          fetching: null
        })
      })
      .catch(e => {
        this.setState({ fetching: e.message })
      })
  }

  postImage = async () => {
    if (this.state.newUrl.length > 0 && this.state.newTitle.length > 0) {
      this.setState({ saving: true })
      await fetch('https://localhost:5001/api/images/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.newTitle,
          url: this.state.newUrl,
          dateCreated: new Date(),
          poiID: this.props.poiID
        }) // body data type must match "Content-Type" header
      })
        .then(result => {
          if (result.status !== 201) {
            new Error()
          }
          return result.json()
        })
        .then(image => {
          const images = this.state.images
          images.unshift(image)
          this.setState({ newTitle: '', newUrl: '', saving: null, images })
        })
        .catch(e => {
          this.setState({ saving: e.message })
        })
    }
  }
  render () {
    const { fetching, images, saving } = this.state

    if (fetching === null) {
      const divImages = images.map(i => (
        <EditImageForm image={i} key={i.imageID} />
      ))
      return (
        <div>
          <p>
            {saving === null
              ? 'Add new photo:'
              : saving === true
                ? 'saving...'
                : saving}
          </p>
          <FormGroup row>
            <img
              src={this.state.newUrl}
              alt={''}
              className='edit_avatar row_form_m'
            />
            <TextField
              name='name'
              onChange={this.handleChange('newUrl')}
              value={this.state.newUrl}
              label='New image url'
              margin='normal'
              variant='outlined'
            />
            <TextField
              name='name'
              onChange={this.handleChange('newTitle')}
              value={this.state.newTitle}
              label='New image title'
              margin='normal'
              variant='outlined'
            />
            <Button
              onClick={() => {
                this.postImage()
              }}
              color='primary'
            >
              Add
            </Button>
          </FormGroup>
          <Divider/>
          <p>Edit photo:</p>
          {divImages.length === 0 && <p>0 photos</p>}
          {divImages}
        </div>
      )
    } else if (fetching === true) {
      return <Loading text='Looking for images..' />
    } else {
      return <div>{fetching}</div>
    }
  }
}

export default PoiEditImages
