import React from 'react'

const RightArrow = (props) => {
    return (
        <div className="nextArrow" onClick={props.goNextSlide}>
        <i class="fas fa-chevron-right fa-4x"></i>
      </div>
    );
}

export default RightArrow