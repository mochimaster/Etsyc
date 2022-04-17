import React from 'react'
import { Link } from 'react-router-dom'

const HeaderBanner = () => (
  <div id="header-banner" style={{ display: 'float' }}>
    CASTLE AND CHAIR OPEN BY APPOINTMENT.{' '}
    <Link className="appointment-link" to="/pages/appointment">
      BOOK NOW.
    </Link>
  </div>
)

export default HeaderBanner
