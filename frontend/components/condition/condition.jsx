import React from 'react'

import { CONDITION } from '../../../utils/constants'

import { trackEvent, EVENTS } from '../../../utils/track'

const ConditionDropDownList = ({ setCondition, condition }) => {
  const handleConditionChange = ({ target: { value } }) => {
    setCondition(value)
    trackEvent({
      eventName: EVENTS.SET_FILTER_BY_CONDITION,
      eventProperties: { condition: value }
    })
  }

  return (
    <div className="condition-container">
      <div className="condition-inner-container">
        <label for="condition">Condition: </label>

        <select
          id="condition"
          value={condition}
          onChange={handleConditionChange}
        >
          <option value={CONDITION.ALL}>All</option>
          <option value={CONDITION.NEW}>New</option>
          <option value={CONDITION.USED}>Used</option>
        </select>
      </div>
    </div>
  )
}

export default ConditionDropDownList
