import React from 'react'

import { SORT_TYPE } from '../../../utils/constants'

const SortDropDownList = ({ setSort, sortOption }) => {
  const handleSortChange = ({ target: { value } }) => {
    setSort(value)
  }

  return (
    <div className="sort-container">
      <div className="sort-inner-container">
        <label for="sortParamOrder">Sort by: </label>

        <select
          id="sortParamOrder"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value={SORT_TYPE.PRICE_ASC}>Lowest Price</option>
          <option value={SORT_TYPE.PRICE_DESC}>Highest Price</option>
          <option value={SORT_TYPE.MOST_RECENT}>Most Recent</option>
        </select>
      </div>
    </div>
  )
}

export default SortDropDownList
