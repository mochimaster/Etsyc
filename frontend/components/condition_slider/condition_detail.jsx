import React from 'react'
import { connect } from 'react-redux'
import { addMobileClassName } from '../../../utils/helper'

import { closeModal } from '../../actions/modal_actions'
import { CONDITION } from './condition_slider'

const CONDITION_DETAILS = {
  NEW_IN_BOX:
    'Item “New in box” will have original packaging and shipping box. Box may have previously been opened to inspect contents.',
  NEW: 'Item in “New” condition are opened box and will not have original packaging or shipping box. Item may have been overstock or returned inventory to the manufacturer. Item does not have signs of use and does not present any noticeable blemishes.',
  LIKE_NEW:
    'Item in “Like New” condition present minor visible blemishes or light marks.',
  EXCELLENT:
    'Item in “Excellent” condition present a few light to moderate visible marks or blemishes. Item has been inspected and obvious markings will be disclosed and displayed in photos.',
  GOOD: 'Item in “Good” condition present multiples of moderate to heavy visible marks or blemishes.  Item has been inspected and obvious markings will be disclosed and displayed in photos.',
  FAIR: 'Item in “Fair” condition present heavy visible marks or blemishes, or excessive sign of wear overall. Item has been inspected and obvious markings will be disclosed and displayed in photos.'
}

const ConditionDetail = ({ closeModal }) => {
  return (
    <div className="condition-detail-modal-container">
      <div className={addMobileClassName('condition-detail-modal-header')}>
        <h1> Condition Details</h1>
        <button
          className={addMobileClassName('condition-detail-close')}
          onClick={closeModal}
        >
          <i class="far fa-times-circle"></i>
        </button>
      </div>

      {Object.keys(CONDITION_DETAILS).map((key) => {
        return (
          <>
            <h2 className="condition-detail-modal-h2">{CONDITION[key]}: </h2>
            <span className="condition-detail-modal-span">
              {CONDITION_DETAILS[key]}
            </span>
          </>
        )
      })}
      <br />
      <div className="condition-detail-modal-refer">
        *Refer to “Overview” for more item-specific details.
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(_, mapDispatchToProps)(ConditionDetail)
