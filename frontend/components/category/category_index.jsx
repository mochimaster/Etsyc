import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CategoryIndex = (props) => {
  const [isActive] = useState(false)

  const { getListingsByCategory, page, sortOption } = props

  const categories = {
    1: 'Sofa & Sectional',
    2: 'Seating',
    3: 'Bedroom',
    4: 'Console & Cabinet',
    5: 'Dining',
    6: 'Outdoor',
    7: 'Miscellaneous',
    8: 'Special'
  }

  return (
    <ul className="categories-wrapper">
      {Object.keys(categories).map((categorId) => {
        return (
          <li className={isActive ? 'highlight' : null}>
            <Link
              onClick={() => {
                getListingsByCategory(categorId, page, sortOption)
              }}
              to={`/categories/${categorId}`}
            >
              {categories[categorId]}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default CategoryIndex
