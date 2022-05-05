import React from 'react'

import { capitalize } from 'lodash'

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
          id={isMobile ? 'condition-mobile' : `condition`}
          value={condition}
          onChange={handleConditionChange}
        >
          {Object.values(CONDITION).map((value) => (
            <option value={value}>{capitalize(value)}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ConditionDropDownList
