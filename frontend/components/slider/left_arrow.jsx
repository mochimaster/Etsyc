import React from 'react'

const LeftArrow = ({ goPrevSlide }) => (
  <div className="backArrow" onClick={goPrevSlide}>
    <i className={`fas fa-chevron-left ${window.isMobile ? 'fa-8x' : 'fa-4x'}`}></i>
  </div>
)

export default LeftArrow
