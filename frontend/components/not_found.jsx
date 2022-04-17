import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const NotFound = ({ location }) => {
  if (['/faq', '/pages/appointment'].includes(location.pathname))
    return <div></div>

  return (
    <div className="page-body-container">
      <h1 className="page-not-found-header">404 - Page Not Found!</h1>
      <Link className="page-not-found-link" to="/listings">
        Go Home
      </Link>
    </div>
  )
}

const mapStateToProps = (_, ownProps) => {
  return ownProps
}

export default connect(mapStateToProps, () => {})(NotFound)
