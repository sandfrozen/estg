import React, { Component } from 'react'
import { FormGroup, Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import transitions from '@material-ui/core/styles/transitions'

class EditImageForm extends Component {
  state = {
    updating: null,
    deleted: false
  }

  componentDidMount () {
    this.setState({
      title: this.props.image.title,
      url: this.props.image.url
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      updating: 'update'
    })
  }

  editImage = async () => {
    if (this.state.updating === 'update') {
      this.setState({ updating: true })
      await fetch(
        'https://localhost:5001/api/images/' + this.props.image.imageID,
        {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            imageID: this.props.image.imageID,
            title: this.state.title,
            url: this.state.url,
            poiID: this.props.image.poiID
          }) // body data type must match "Content-Type" header
        }
      )
        .then(result => {
          if (result.status !== 204) {
            new Error()
          }
          this.setState({ updating: null })
        })
        .catch(e => {
          this.setState({ updating: e.message })
        })
    }
  }

  deleteImage = async () => {
    this.setState({ updating: true })
      await fetch(
        'https://localhost:5001/api/images/' + this.props.image.imageID,
        {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          headers: {
            'Content-Type': 'application/json'
          } // body data type must match "Content-Type" header
        }
      )
        .then(result => {
          if (result.status !== 204) {
            new Error()
          }
          this.setState({ deleted: true})
        })
        .catch(e => {
          this.setState({ updating: e.message })
        })
  }

  render () {
    const { updating, title, url, deleted } = this.state
    const image = this.props.image
    if( deleted ) return null
    return (
      <FormGroup row id={image.imageID}>
        <img src={url} alt={title} className='edit_avatar row_form_m' />
        <TextField
          name='url'
          value={url + ''}
          label='Image url'
          onChange={this.handleChange('url')}
          margin='normal'
          variant='outlined'
        />
        <TextField
          name='title'
          value={title + ''}
          label='Image title'
          onChange={this.handleChange('title')}
          margin='normal'
          variant='outlined'
        />
        <Button color='primary' onClick={this.editImage}>
          {updating === true ? 'saving..' : updating === null ? 'ok' : updating}
        </Button>
        <Button color='secondary' onClick={this.deleteImage}>
          Delete
        </Button>
      </FormGroup>
    )
  }
}

export default EditImageForm
