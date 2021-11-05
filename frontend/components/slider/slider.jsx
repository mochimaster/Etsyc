import React, { useState, useEffect } from 'react'

import { useSwipeable } from 'react-swipeable'

import LeftArrow from './left_arrow'
import RightArrow from './right_arrow'
import { sliderThumbnails } from './slider_thumbnail'

import { MODAL_TYPE } from '../../../utils/constants'
import { trackEvent, EVENTS } from '../../../utils/track'

const Slider = (props) => {
  const [images] = useState(
    props.images ||
      props.listing ||
      props.listing.photoUrls ||
      props.listing.photoUrl
  )

  const [currentIndex, setIndex] = useState(0)
  const [isModalDisplayed] = useState(props.modal)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [images, currentIndex, isModalDisplayed])

  const goNextSlide = () => {
    setIndex(() => (currentIndex + 1) % images.length)
  }

  const goPrevSlide = () => {
    setIndex(() =>
      currentIndex === 0
        ? setIndex(images.length - 1)
        : setIndex(currentIndex - 1)
    )
  }

  const handleKeyDown = (event) => {
    switch (event.code) {
      case 'ArrowRight':
        goNextSlide()
        break
      case 'ArrowLeft':
        goPrevSlide()
        break
      case 'Escape':
        props.closeModal()
        break
    }
  }

  const additionalClassName = isModalDisplayed ? 'modal-child-photo' : ''
  const modalX = isModalDisplayed ? (
    <i
      className={`far fa-window-close ${window.isMobile ? 'fa-8x' : 'fa-4x'}`}
      onClick={props.closeModal}
    />
  ) : (
    ''
  )

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      window.visualViewport.scale === 1 ? goNextSlide() : undefined,
    onSwipedRight: () =>
      window.visualViewport.scale === 1 ? goPrevSlide() : undefined,
    onSwipedUp: () =>
      window.visualViewport.scale === 1 ? props.closeModal() : undefined,
    onSwipedDown: () =>
      window.visualViewport.scale === 1 ? props.closeModal() : undefined,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  return images.length <= 1 ? (
    <div {...handlers}>
      <img
        className={`slider-image ${additionalClassName}`}
        src={images[0]}
        onClick={() => {
          props.openModal(MODAL_TYPE.SLIDER)
        }}
      />
      {modalX}
    </div>
  ) : (
    <div {...handlers} className="slider">
      <div className="slider-wrapper">
        <LeftArrow goPrevSlide={goPrevSlide} />
        <RightArrow goNextSlide={goNextSlide} />
        <img
          className={`slider-image ${additionalClassName}`}
          src={images[currentIndex]}
          onClick={() => {
            trackEvent({ eventName: EVENTS.ENLARGE_IMAGE })

            props.openModal(MODAL_TYPE.SLIDER)
          }}
        />
        {modalX}
      </div>
      {sliderThumbnails(images, setIndex)}
    </div>
  )
}

export default Slider
