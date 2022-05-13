import React from 'react'

import { isEqual } from 'lodash'
import { Helmet } from 'react-helmet'

import ListingIndexItem from './listing_index_item'
import ReactLoading from 'react-loading'
import { addMobileClassName } from '../../../utils/helper'

class ListingIndex extends React.Component {
  // need to arrive here from Index all.
  // can filter down from all listings to where authorid

  // need to arrive here from User Profile page.
  // in user Profile, i have own props match params id.

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      listings: [],
      queryTerm: '',
      isBottomHalfPage: false

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

    window.addEventListener(
      'scroll',
      this.isBottomHalfPageEvent.bind(this),
      true
    )
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.isBottomHalfPageEvent.bind(this))
  }

  componentDidUpdate(prevProps) {
    const { page, sortOption, match, filters } = this.props

    const params = new URLSearchParams(this.props.location.search)
    const pageParams = params.get('page') || 1
    const queryParams = params.get('query') || ''

    if (this.state.queryTerm != queryParams)
      this.setState({ queryTerm: queryParams })

    if (match.url === '/listings/search' && !isEqual(prevProps, this.props)) {
      this.props.searchListing({ title: queryParams }, pageParams)
    } else if (
      match.path === '/users/:userId/home' &&
      !isEqual(prevProps, this.props) &&
      prevProps.page != pageParams
    ) {
      this.props.getDisabledListingsByUserId(
        this.props.match.params.userId,
        pageParams,
        undefined,
        undefined,
        queryParams
      )
    } else if (
      (match.url === 'listings' && sortOption !== prevProps.sortOption) ||
      filters !== prevProps.filters ||
      page != pageParams
    ) {
      if (this.props.match.url.slice(0, 6) === '/users') return
      this.props.getListings(pageParams || page, sortOption, filters)
    }
  }

  isBottomHalfPageEvent() {
    const scrollTotal = $(window).height() + $(window).scrollTop()

    if (scrollTotal / $(document).height() > 0.5) {
      this.setState({ isBottomHalfPage: true })
    } else {
      this.setState({ isBottomHalfPage: false })
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
    const isOnSearchPage = this.props.match.path == '/listings/search'
    const toAppendS = (string) =>
      `${this.props.count > 1 ? `${string}s` : string}`

    const displaySearchCount = this.state.queryTerm.length >= 1 && (
      <div
        className={`search-result-count ${
          isMobile ? 'search-result-count-mobile' : ''
        }`}
      >
        Search {toAppendS('result')} for "{this.state.queryTerm}" (
        {this.props.count} {toAppendS('result')})
      </div>
    )

    const scrollToTopButton = (
      <button
        className={`${addMobileClassName('scroll-to-top')} ${
          this.state.isBottomHalfPage ? 'showButton' : ''
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i class="fas fa-chevron-up"></i>
      </button>
    )

    return (
      <div>
        <Helmet>
          <title>Shop All Furniture | Castle and Chair</title>
          <meta
            name="title"
            property="og:title"
            content="Shop All Furniture | Castle and Chair"
          ></meta>
          <meta
            name="description"
            property="og:description"
            content="Shop Castle and Chair, furniture from West Elm, Restoration Hardware, Pottery Barn 
            and more. New, like new, and used condition furniture."
          />
          <meta
            property="og:url"
            content={`https://www.castleandchair.com/#${this.props.location.pathname}`}
          />
          <link
            rel="canonical"
            href={`https://www.castleandchair.com/#${this.props.location.pathname}`}
          />
        </Helmet>
        {isOnSearchPage && displaySearchCount}
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
        {scrollToTopButton}
      </div>
    )
  }
}

export default ListingIndex
