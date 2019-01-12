import React, { Component, Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Button, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Carousel from './Carousel'
import { CurrentUserConsumer } from '../../context/CurrentUser.context'

class Poi extends Component {
  state = {
    userPoi: null,
    fetching: '', // '' - fetching, null - ok, 'message' - fetch error
    liking: null
  }

  componentDidMount () {
    this.fetchPoi()
  }

  fetchPoi = async () => {
    await fetch(
      `https://localhost:5001/api/userPois/${this.props.match.params.id}`
    )
      .then(response => response.json())
      .then(userPoi => {
        console.log(userPoi)
        this.setState({
          userPoi,
          poi: userPoi.poi,
          images: userPoi.images,
          likes: userPoi.likes,
          comments: userPoi.comments,
          fetching: null,
          likesDiv: false
        })
      })
      .catch(e => {
        console.log(e)
        this.setState({ fetching: e.message })
      })
  }

  fetchLikesForUserPoi = async () => {
    await fetch(
      `https://localhost:5001/api/likes/forUserPoi/${
        this.props.match.params.id
      }`
    )
      .then(response => response.json())
      .then(likes => {
        console.log(likes)
        this.setState({
          likes
        })
      })
      .catch(e => {})
  }

  handleLikesDiv = () => {
    this.setState({ likesDiv: !this.state.likesDiv })
  }

  handleLike = async (userID, event) => {
    console.log('handleLike', userID)
    this.setState({ liking: '' })
    await fetch('https://localhost:5001/api/likes', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userPoiID: this.props.match.params.id,
        userID: userID
      }) // body data type must match "Content-Type" header
    })
      .then(result => {
        if (result.status === 201) {
          // created
          console.log(result)
          return result.json()
        } else {
          throw new Error()
        }
      })
      .then(r => {
        console.log(r)
        this.setState({
          liking: null
        })
        this.fetchLikesForUserPoi()
      })
      .catch(e => {
        this.setState({ liking: e.message })
      })
  }

  render () {
    const {
      userPoi,
      fetching,
      poi,
      images,
      likes,
      comments,
      likesDiv,
      liking
    } = this.state
    if (fetching === null && userPoi.private === true) {
      return <Paper className='paper-w-w'>This POI is private.</Paper>
    } else if (fetching === null) {
      return (
        <CurrentUserConsumer>
          {({ user }) => (
            <Paper className='paper-w-w'>
              <Typography
                component='h2'
                variant='headline'
                align='center'
                gutterBottom
              >
                {poi.title}
              </Typography>
              <Typography
                color='primary'
                variant='overline'
                align='center'
                gutterBottom
              >
                {user && user.userID === userPoi.userID
                  ? 'it is your POI'
                  : 'POI by ' + userPoi.user.name}
              </Typography>
              <Carousel images={images} />
              <Divider />
              <div className='space likes'>
                <span onClick={this.handleLikesDiv}>{likes.length} 👍</span>
                {user ? (
                  <Fragment>
                    <Button
                      onClick={() => this.handleLike(user.userID)}
                      color='primary'
                    >
                      {liking === ''
                        ? 'adding your like...'
                        : liking === null
                          ? 'Like'
                          : 'Like - ' + liking}
                    </Button>
                  </Fragment>
                ) : (
                  <Button
                    color='primary'
                    component={Link}
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location }
                    }}
                  >
                    Like it? Login first
                  </Button>
                )}
                {user && user.userID === userPoi.userID && (
                  <Button
                    color='secondary'
                    component={Link}
                    to={`/edit-poi/${userPoi.userPoiID}`}
                  >
                    Edit POI
                  </Button>
                )}
                <Divider />

                {likes.length > 0 && (
                  <div className={likesDiv ? 'visible_div' : 'hidden_div'}>
                    People who likes this POI:
                    <ul>
                      {likes.map(like => (
                        <li key={like.likeID}>{like.user.name}</li>
                      ))}
                    </ul>
                    <Divider />
                  </div>
                )}
              </div>
              <Typography component='h3' variant='headline' gutterBottom>
                Description:
              </Typography>
              <div className='space'>{poi.description}</div>
              <Divider />
              <div className='space comments'>
                {comments.length === 0 && <p>No comments.</p>}
                {comments.length > 0 && (
                  <div>
                    Comments:
                    {comments.map(comment => (
                      <div key={comment.commentID}>
                        <p>
                          {comment.user.name} {comment.dateCreated}
                        </p>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Paper>
          )}
        </CurrentUserConsumer>
      )
    } else if (fetching === '') {
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

export default Poi
