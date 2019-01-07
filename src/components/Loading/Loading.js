import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
  root: {
    flexGrow: 1,
    paddingTop: 2,
    paddingLeft: 16,
    paddingRight: 16
  }
}

class Loading extends React.Component {
  render () {
    const { classes } = this.props
    const text = this.props.text || 'Loading...'
    return (
      <div className={classes.root}>
        {text}
        <LinearProgress />
      </div>
    )
  }
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loading)
