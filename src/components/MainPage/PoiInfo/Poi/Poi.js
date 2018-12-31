import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import getNameAndId from '../../../../helpers/helpers';

class Poi extends Component {
  render () {
    let { title_and_id } = this.props.match.params || { title_and_id: '0' }
    const { name: title, id } = getNameAndId(title_and_id)

    return (
      <Paper className='paper-w-w'>
        This is poi:
        <p>{title}</p>
        <p>{id}</p>
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
