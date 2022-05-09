import React, { useState } from 'react'

import { addMobileClassName } from '../../../utils/helper'

export const Collapsible = ({ title = '', content = '', expand }) => {
  const [isExpand, setIsExpand] = useState(expand || false)

  return (
    <div className={addMobileClassName('expandable-box-container')}>
      <span>
        <button
          className={addMobileClassName('expandable-button')}
          onClick={() => setIsExpand(!isExpand)}
        >
          <label className="collapsible-title">{title}</label>
          <a
            onClick={() => setIsExpand(!isExpand)}
            class={`arrow-down-close ${isExpand ? 'open' : ''}`}
          ></a>
        </button>
      </span>
      <div className={`collapsible-content ${isExpand ? 'open' : ''}`}>
        {content}
      </div>
    </div>
  )
}
