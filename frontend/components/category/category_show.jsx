import React from 'react'
import { Redirect } from 'react-router-dom'

import ListingIndexItem from '../listing_index/listing_index_item'
import ListingIndex from '../listing_index/listing_index_container'

class CategoryShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listings: []
    }
  }

  // componentDidMount(){
  //     this.props.getListingsByCategory(this.props.category).then((listings) =>
  //         this.setState({
  //             listings: listings
  //         }))
  // }

  componentDidUpdate(prevProps) {
    const { sortOption, page, location } = this.props
    const { pathname } = location
    const category = pathname.split('/categories/')[1]

    if (sortOption !== prevProps.sortOption || page !== prevProps.page) {
      this.props.getListingsByCategory(category, page, sortOption)
    }
  }

  render() {
    if (!this.props.listings) return <Redirect to="/" />
    return (
      <div>
        <ul className="index-wrapper">
          {this.props.listings.map((listing) => {
            return (
              <ListingIndexItem
                key={listing.id}
                listing={listing}
                deleteListing={this.props.deleteListing}
              />
            )
          })}
        </ul>
      </div>
    )
    // return <div>
    //       <ul className="index-wrapper">
    //         {this.props.listings.map(listing => {
    //           return <ListingIndex key={listing.id} listing={listing} deleteListing={this.props.deleteListing} />;
    //         })}
    //       </ul>
    //     </div>
  }
}

export default CategoryShow
