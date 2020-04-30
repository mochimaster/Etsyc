import React from 'react'

const RightArrow = ({ goNextSlide }) => (
  <div className="nextArrow" onClick={goNextSlide}>
    <i className="fas fa-chevron-right fa-4x"></i>
  </div>
)

export default RightArrow
