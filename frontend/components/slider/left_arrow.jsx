import React from 'react'

const LeftArrow = (props) => {
    return (
        <div className="backArrow" onClick={props.goPrevSlide}>
        <i class="fas fa-chevron-left fa-4x"></i>
      </div>
    );
}

export default LeftArrow