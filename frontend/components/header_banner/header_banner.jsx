import React from 'react'
import { Link } from 'react-router-dom'

import { random } from 'lodash'

const colors = ['#d68391', '#aec6cf']

const HeaderBanner = () => (
  <div
    id={`${window.isMobile ? 'header-banner-mobile' : 'header-banner'}`}
    className="animate__animated animate__bounce"
    style={{ background: colors[random(0, 1)] }}
  >
    CASTLE AND CHAIR OPEN BY APPOINTMENT.&nbsp;
    <Link className="appointment-link" to="/visit">
      BOOK NOW.
    </Link>
  </div>
)

export default HeaderBanner
