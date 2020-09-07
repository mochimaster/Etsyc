import React from 'react'

import { CONDITION } from '../../../utils/constants'

const ConditionDropDownList = ({ setCondition, condition }) => {
  const handleConditionChange = ({ target: { value } }) => {
    setCondition(value)
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
