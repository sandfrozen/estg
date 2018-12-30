import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'

class Poi extends Component {
  render () {
    let { id, title } = this.props.match.params || { id: '0', title: '0' }
    title = title.split('-').join(' ')
    return (
      <Paper className='paper-w-w'>
        This is poi: {id} {title}
      </Paper>
    )
  }
}

export default Poi
