import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
    8: 'Special',
    9: 'Appliance'
  }

  return (
    <ul className="categories-wrapper">
      {Object.keys(categories).map((categoryId) => {
        return (
          <li className={isActive ? 'highlight' : null}>
            <Link
              onClick={() => {
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
