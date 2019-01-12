import React, { Component, Fragment } from 'react'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

import './style.css'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class Carousel extends Component {
  state = {
    activeImage: 0
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeImage: prevState.activeImage + 1
    }))
  }

  handleBack = () => {
    this.setState(prevState => ({
      activeImage: prevState.activeImage - 1
    }))
  }

  handleImageChange = activeImage => {
    this.setState({ activeImage })
  }

  render () {
    const { activeImage } = this.state
    const images = this.props.images
    const maxImages = images.length
    let direction = 'rtl'
    return (
      <Fragment>
        <MobileStepper
          steps={maxImages}
          position='static'
          activeStep={activeImage}
          className='mobileStepper'
          nextButton={
            <Button
              size='small'
              onClick={this.handleNext}
              disabled={activeImage === maxImages - 1}
            >
              Next image
              {direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
          backButton={
            <Button
              size='small'
              onClick={this.handleBack}
              disabled={activeImage === 0}
            >
              {direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
              Previous image
            </Button>
          }
        />
        <AutoPlaySwipeableViews
          axis={direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeImage}
          onChangeIndex={this.handleImageChange}
          enableMouseEvents
        >
          {images.map((image, index) => (
            <div key={image.imageID}>
              {Math.abs(activeImage - index) <= 2 ? (
                <img className='c_image' src={image.url} alt={image.title} />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </Fragment>
    )
  }
}

export default Carousel
