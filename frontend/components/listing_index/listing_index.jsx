import React from 'react'

import queryString from 'query-string'

import ListingIndexContainer from './listing_index_container'
import ListingIndexItem from './listing_index_item'
import ReactLoading from 'react-loading'
import { Pagination } from 'semantic-ui-react'

class ListingIndex extends React.Component {
  // need to arrive here from Index all.
  // can filter down from all listings to where authorid

  // need to arrive here from User Profile page.
  // in user Profile, i have own props match params id.

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      listings: []

      // page: props.location.search ? props.location.search.slice(6) : undefined,
      // pages: undefined
    }
    // this.handlePage = this.handlePage.bind(this)
  }

  componentDidMount() {
    // prevent getListings firing again after search result is returned
    if (this.props.match.path == '/search') {
      return null
    }
  }

  componentDidUpdate(prevProps) {
    const { page, sortOption, match, filters } = this.props

    const params = queryString.parse(this.props.location.search)
    const pageParams = params.page || 1

    if (
      (match.url === 'listings' && sortOption !== prevProps.sortOption) ||
      filters !== prevProps.filters ||
      page != pageParams
    ) {
      this.props.getListings(pageParams || page, sortOption, filters)
    }
  }

  render() {
    const deviceClassName = window.isMobile ? 'device-mobile' : 'device-large'

    const currentUrl = this.props.match.url
    const rootUrl = currentUrl.split('/')[1]

    if (rootUrl === 'users') {
      if (this.props.disabledListings.length) {
        return (
          <div>
            <ul className={`index-wrapper ${deviceClassName}`}>
              {this.props.disabledListings.map((disabledListing) => {
                return (
                  <ListingIndexItem
                    key={disabledListing.id}
                    listing={disabledListing}
                  />
                )
              })}
            </ul>
          </div>
        )
      } else {
        setTimeout(() => {
          return <div className="body">You have no disabled listings.</div>
        }, 5000)

        return (
          <div id="react-loading" className="react-loading">
            <ReactLoading type="bubbles" color="black" />
          </div>
        )
      }
    }

    if (
      this.props.match.path == '/listings/search' &&
      this.props.listings === 0
      // this.props.listings.length == 0
    ) {
      return (
        <div className="no-result">
          <p>
            No search result found. Try searching for "bed", "lamp", "table".
          </p>
        </div>
      )
    } else if (
      (rootUrl !== 'users' && !this.props.listings) ||
      this.props.listings == 0
    ) {
      // return <div className="loading-page">Loading...</div>
      return (
        <div id="react-loading" className="react-loading">
          <ReactLoading type="bubbles" color="black" />
        </div>
      )
    }

    // let paginate;
    // if(!(this.props.match.path === "/search")){
    //   paginate = <div className="pagination-wrapper">
    //     <Pagination
    //       ellipsisItem={null}
    //       boundaryRange={2}
    //       siblingRange={2}
    //       onPageChange={this.handlePage}
    //       defaultActivePage={this.state.page}
    //       totalPages={this.state.pages}
    //     />
    //   </div>
    // }

    return (
      <div>
        <ul className={`index-wrapper ${deviceClassName}`}>
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
  }
  // {paginate}
}

export default ListingIndex
