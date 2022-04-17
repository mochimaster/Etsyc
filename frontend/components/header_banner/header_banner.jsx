import React from 'react'
import { Link } from 'react-router-dom'

const HeaderBanner = () => (
  <div id={`${window.isMobile ? 'header-banner-mobile' : 'header-banner'}`}>
    CASTLE AND CHAIR OPEN BY APPOINTMENT.{' '}
    <Link className="appointment-link" to="/pages/appointment">
      BOOK NOW.
    </Link>
  </div>
)

export default HeaderBanner
