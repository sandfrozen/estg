import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import getNameAndId from '../../../../helpers/helpers';

class Poi extends Component {
  render () {
    let { id } = this.props.match.params || { id: '0' }

    return (
      <Paper className='paper-w-w'>
        This is poi:
        <p>fetching poi for id: {id}</p>
        <Button
          color='primary'
          component={Link}
          to={`/edit-poi/${id}` }
        >
          Edit POI
        </Button>
      </Paper>
    )
  }
}

export default Poi
