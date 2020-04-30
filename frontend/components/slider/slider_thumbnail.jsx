import React from 'react'

export const sliderThumbnails = (images, setIndex) => (
  <div className="slider-thumbnails-wrapper">
    <div className="slider-thumbnail-inner-wrapper">
      {images.map((image, index) => {
        return (
          <img
            className="slider-thumbnails modal-thumbnails"
            onClick={() => setIndex(index)}
            onMouseEnter={() => setIndex(index)}
            src={image}
          />
        )
      })}
    </div>
  </div>
)
