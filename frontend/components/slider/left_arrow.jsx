import React from 'react'

const LeftArrow = ({ goPrevSlide }) => (
  <div className="backArrow" onClick={goPrevSlide}>
    <i className={`fas fa-chevron-left ${isMobile ? 'fa-6x' : 'fa-4x'}`}></i>
  </div>
)

export default LeftArrow
