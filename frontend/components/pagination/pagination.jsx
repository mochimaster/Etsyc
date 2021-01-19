import React from 'react'
import { Pagination } from 'semantic-ui-react'

import { trackEvent, EVENTS } from '../../../utils/track'

class PaginationAll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listings: props.listings,
      page: props.location.search ? props.location.search.slice(6) : 1,
      pages: 1,
      filters: props.filters
    }
    this.handlePage = this.handlePage.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { pages, sortOption, filters } = this.props
    const { page } = this.state

    if (pages !== prevState.pages) {
      this.setState({
        pages
      })
    }

    if (
      this.props.match.url === '/listings' &&
      sortOption !== prevProps.sortOption
    ) {
      this.props.getListings(page, sortOption, filters)
    }
  }

  componentDidMount() {
    // prevent getListings firing again after search result is returned
    // if (this.props.match.path == "/search") {
    //     return null
    // }

    if (this.props.match.url === '/categories') {
      const categoryId = this.props.location.pathname.slice(12)
      const pageParams = this.props.location.search
      const pageNum = parseInt(pageParams.slice(6))

      // commented on 4/25 9.40pm
      // this.props.getListingsByCategory(categoryId, pageNum)

      // .then(response => {
      //     this.setState({
      //         listings: this.props.listings,
      //         page: this.props.page,
      //         pages: this.props.pages
      //     })
      // })
    } else if (this.props.match.url === '/listings') {
      this.props.getListings(this.state.page).then((response) => {
        this.setState({
          listings: this.props.listings,
          page: this.props.page,
          pages: this.props.pages,
          filters: this.props.filters
        })
      })
    } else if (this.props.match.url === '/search') {
      const title = this.props.location.search.slice(7)
      const pageParams = this.props.location.search
      const pageNum = parseInt(pageParams.slice(6))

      this.props.searchListing({ title: title }, pageNum).then((response) => {
        this.setState({
          listings: this.props.listings,
          page: this.props.page,
          pages: this.props.pages
        })
      })
    } else if (this.props.match.url.slice(-5) === '/home') {
      const userId = this.props.match.params.userId

      this.props.getDisabledListingsByUserId(userId).then((res) => {
        this.setState({
          listings: res.disabledListings,
          page: this.props.page,
          pages: res.pages
        })
      })
    }
  }

  handlePage(e, { activePage }) {
    if (!activePage) {
      activePage = 2
    }
    let goToPage = { activePage }
    let pageNum = goToPage.activePage
    // let pageString = pageNum.toString()

    // this.props.history.push({
    //     pathname: this.props.location.pathname,
    //     search: `?page=${pageNum}`
    // });

    trackEvent({
      eventName: EVENTS.SET_PAGINATION,
      eventProperties: { 'To Page': pageNum }
    })

    if (this.props.match.url === '/categories') {
      this.props.history.push(`${this.props.location.pathname}?page=${pageNum}`)
      const categoryId = this.props.location.pathname.slice(12)

      this.props
        .getListingsByCategory(categoryId, pageNum, this.props.filters)
        .then((response) => {
          this.setState({
            listings: this.props.listings,
            page: this.props.page,
            pages: this.props.pages,
            filters: this.props.filters
          })
        })
    } else if (this.props.match.url === '/search') {
      const searchQuery = this.props.location.search.slice(7)
      // this.props.history.push(`/${this.props.location.pathname}?query=${searchQuery}&page=${pageNum}`);

      this.props
        .searchListing({ title: searchQuery }, pageNum)
        .then((response) =>
          this.setState({
            listings: this.props.listings,
            page: this.props.page,
            pages: this.props.pages
          })
        )
    } else if (this.props.match.url === '/listings') {
      this.props.history.push({
        pathname: '/listings',
        search: `?page=${pageNum}`
      })
      this.props
        .getListings(pageNum, this.props.sortOption, this.props.filters)
        .then((response) =>
          this.setState({
            // listings: this.props.listings,
            page: this.props.page,
            pages: this.props.pages,
            filters: this.props.filters
          })
        )
    } else if (this.props.match.url.slice(-5) === '/home') {
      this.props
        .getDisabledListingsByUserId(this.props.match.params.userId, pageNum)
        .then(() =>
          this.setState({
            listings: this.props.disabledListings,
            page: this.props.page,
            pages: this.props.pages,
            filters: this.props.filters
          })
        )
    }

    // } else if (this.props.match.url === "/listings"){
    //     this.props.getListings(pageNum);
    // }
  }

  render() {
    if (
      this.props.disabledListings.length ||
      (this.props.listings && this.props.listings.length)
    ) {
      return (
        <div className="pagination-wrapper">
          <Pagination
            ellipsisItem={'...'}
            onPageChange={this.handlePage}
            defaultActivePage={this.state.page}
            totalPages={this.state.pages}
          />
        </div>
      )
    } else {
      return <div></div>
    }

    // return <Pagination ellipsisItem={null} boundaryRange={2} siblingRange={2} onPageChange={this.handlePage} defaultActivePage={this.state.page} totalPages={this.state.pages} />
  }
}

export default PaginationAll
