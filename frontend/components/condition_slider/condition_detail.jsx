import React from 'react'

import { CONDITION } from './condition_slider'

const CONDITION_DETAILS = {
  NEW_IN_BOX: 'ITEM IN NEW IN BOX CONDITION',
  NEW: 'ITEM IN NEW CONDITION',
  LIKE_NEW: 'ITEM IN LIKE NEW CONDITION',
  EXCELLENT: 'ITEM IN EXCELLENT CONDITION',
  GOOD: 'ITEM IN GOOD CONDITION',
  FAIR: 'ITEM IN FAIR CONDITION'
}

export const ConditionDetail = () => {
  return (
    <div className='condition-detail-modal-container'>
      <h1> Condition Details</h1>
      {Object.keys(CONDITION_DETAILS).map((key) => {
        return (
          <>
            <h2>{CONDITION[key]}: </h2>
            <span>{CONDITION_DETAILS[key]}</span>
          </>
        )
      })}
    </div>
  )
}
