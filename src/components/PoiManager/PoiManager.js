import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

class PoiManager extends Component {
  state = {
    poi: {
      id: 0,
      title: ''
    }
  }

  render () {
    const id = this.props.match.params.id
    if ( id === undefined) {
      return <Paper className='paper-w-w'>New poi</Paper>
    } else {
      try {
        // fetch id and check is for this user
        return <Paper className='paper-w-w'>Edit poi id={id}</Paper>
      } catch {
        return <Paper className='paper-w-w'>:)</Paper>
      }
    }   
  }
}

export default PoiManager
