import React, { Component } from 'react'
import Loading from '../Loading/Loading'
import './style.css'

class Pois extends Component {
  state = {
    pois: [],
    fetched: false
  }

  componentDidMount () {
    this.fetchPois()
  }

  fetchPois = async () => {
    let userID = 0
    try {
      const cookieUser = JSON.parse(localStorage.getItem('user'))
      userID = cookieUser.userID
    } catch (e) {}

    await fetch('https://localhost:5001/api/pois/public/' + userID)
      .then(response => response.json())
      .then(pois => {
        this.setState({ pois, fetched: true })
      })
      .catch(e => {
        this.setState({ fetched: e.message })
      })
  }

  render () {
    const { fetched } = this.state
    if (fetched === true) {
      return (
        <div className='paper-w-w '>
          <div className='left-pois'>1</div>
          <div className='right-pois'>2</div>
        </div>
      )
    } else if (fetched === false) {
      return (
        <div>
          <Loading />
        </div>
      )
    } else {
      return <div>{fetched}</div>
    }
  }
}

export default Pois
