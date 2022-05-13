import React from 'react'

import { MODAL_TYPE } from '../../../utils/constants'
import { addMobileClassName } from '../../../utils/helper'

export const CONDITION = {
  FAIR: 'Fair',
  GOOD: 'Good',
  EXCELLENT: 'Excellent',
  LIKE_NEW: 'Like New',
  NEW: 'New',
  NEW_IN_BOX: 'New in box'
}

const isSelected = (conditionKey, condition) =>
  conditionKey === condition ? 'condition-slider-item-selected' : ''

const ConditionSlider = ({ condition, openModal }) => (
  <div>
    <h1>
      Condition{' '}
      <button
        className={addMobileClassName('condition-slider-question-mark')}
        onClick={() => {
          openModal(MODAL_TYPE.CONDITION_DETAIL)
        }}
      >
        <i class="far fa-question-circle"></i>
      </button>
    </h1>
    <ul className={addMobileClassName('condition-slider-container')}>
      {Object.keys(CONDITION).map((key) => (
        <li className={`condition-slider-item ${isSelected(key, condition)}`}>
          {CONDITION[key]}
        </li>
      ))}
    </ul>
  </div>
)

export default ConditionSlider
