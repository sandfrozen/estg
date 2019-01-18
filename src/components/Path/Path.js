import React, { Component, Fragment } from 'react'
import { Paper, Typography, Divider } from '@material-ui/core'
import Loading from '../Loading/Loading'
import ta from 'time-ago'
import { Link } from 'react-router-dom'

class Path extends Component {
  state = {
    path: null,
    fetching: true
  }
  componentDidMount () {
    this.fetchPath()
  }

  fetchPath = async () => {
    const pathID = this.props.match.params.id
    await fetch(`https://localhost:5001/api/paths/${pathID}`)
      .then(response => response.json())
      .then(path => {
        this.setState({
          path,
          fetching: false
        })
      })
      .catch(e => {
        this.setState({ fetching: e.message })
      })
  }

  render () {
    const { path, fetching } = this.state
    if (fetching === false) {
      const timeAgo = ta.ago(path.dateCreated)
      // console.log(path)
      const poisDiv =
      path.pathPois === 0
        ? '0 POIs'
        : path.pathPois.map(pathPoi => {
          const poi = pathPoi.poi
          console.log('poippp', poi)
          const date = new Date(poi.dateCreated)
          const timeAgo = ta.ago(date)
          return (
            <Fragment key={poi.poiID}>
              <div className='like-fragment'>
                <img
                  className='community-image'
                  src={poi.images[0].url }
                  alt='poi'
                />
                <p className='community-like'>
                  <span className='community-date'>Created: {timeAgo}</span>
                  <br />
                  <Link className='community-title' to={`/poi/${poi.poiID}`}>
                    {poi.title}
                  </Link>
                  <br />
                  <span className='community-comment'>{poi.content}</span>
                </p>
              </div>
              <Divider />
            </Fragment>
          )
        })
      return (
        <Paper className='paper-w-w'>
          <div className='community-date'>added {timeAgo}</div>
          <Typography variant='h5' gutterBottom>
            {path.title}
          </Typography>
          {poisDiv}
        </Paper>
      )
    } else if (fetching === true) {
      return (
        <Paper className='paper-w-w'>
          <Loading />
        </Paper>
      )
    } else {
      return <Paper className='paper-w-w'>{fetching}</Paper>
    }
  }
}

export default Path
