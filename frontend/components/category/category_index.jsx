import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { trackEvent, EVENTS } from '../../../utils/track'

const CategoryIndex = (props) => {
  const [isActive] = useState(false)

  const { getListingsByCategory, page, sortOption, filters } = props

  const categories = {
    1: 'Sofa & Sectional',
    2: 'Seating',
    3: 'Bedroom',
    4: 'Console & Cabinet',
    5: 'Dining',
    6: 'Outdoor',
    7: 'Miscellaneous',
    8: 'Clearance',
    9: 'Decor'
    // 9: 'Appliance'
  }

  return (
    <ul
      className={`categories-wrapper ${
        isMobile ? 'categories-wrapper-mobile' : ''
      }`}
    >
      {[1, 9, 2, 3, 4, 5, 6, 7, 8].map((categoryId) => {
        return (
          <li
            className={`${isActive ? 'highlight' : ''} ${
              isMobile ? 'categories-item-mobile' : ''
            }`}
          >
            <Link
              onClick={() => {
                trackEvent({
                  eventName: EVENTS.SET_CATEGORY,
                  eventProperties: { category: categories[categoryId] }
                })
                getListingsByCategory(categoryId, page, sortOption, filters)
              }}
              to={`/categories/${categoryId}`}
            >
              {categories[categoryId]}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default CategoryIndex
