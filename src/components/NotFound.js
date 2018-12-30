import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const NotFound = ({ location }) => {
  const [counter, setCounter] = useState(10)

  const countDown = () => setCounter(counter - 1)

  useEffect(
    () => {
      // console.log('component useEffect (didMount / update)')
      // const interval = setInterval(countDown, 1000)
      // setIntervalId(interval)
      const id = setTimeout(countDown, 1000)
      return () => clearTimeout(id)
    },
    [counter]
  )

  return (
    <div onClick={countDown}>
      <p>No math for <code>{location.pathname}</code></p>
      <p>Redirect to homepage in {counter} seconds</p>
      {counter === 0 && <Redirect to='/' />}
    </div>
  )
}

// class NotFound extends Component {
//   state = {
//     counter: 10
//   }

//   componentDidMount () {
//     const intervalId = setInterval(this.countdown, 1000)
//     this.setState({ intervalId })
//   }

//   countdown = () => {
//     this.setState({counter: this.state.counter-1})
//   }

//   componentWillMount () {
//     clearInterval(this.state.intervalId)
//   }

//   render () {
//     const { location } = this.props
//     const { counter } = this.state
//     return (
//       <div>
//         <p>No math for <code>{location.pathname}</code></p>
//         <p>Redirect to homepage in {counter} seconds</p>
//         {counter === 0 && <Redirect to='/' />}
//       </div>
//     )
//   }
// }

export default NotFound