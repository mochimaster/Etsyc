import React from 'react'

import ListingIndex from '../listing_index/listing_index_container'

class HomeIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabledListings: []
    }
  }

  componentDidMount() {
    this.props.getDisabledListingsByUserId(this.props.userId)
  }

  render() {
    if (!this.props.userId) return

    return (
      <div>
        <ListingIndex
          listings={this.props.disabledListings}
          match={this.props.match}
        />
      </div>
    )
  }
}

export default HomeIndex
