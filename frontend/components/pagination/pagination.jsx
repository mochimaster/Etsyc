import React from 'react'

import { Pagination } from 'semantic-ui-react'
import { animateScroll as scroll } from 'react-scroll'

import { trackEvent, EVENTS } from '../../../utils/track'

class PaginationAll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listings: props.listings,
      page: 1,
      pages: 1,
      filters: props.filters,
      goToPage: 1
    }
    this.handlePage = this.handlePage.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const isAtHomePage = this.props.match.url.slice(0, 6) === '/users'
    const { page: propsPage, pages, sortOption, filters } = this.props
    const { page } = this.state

    if (prevProps.match.url !== this.props.match.url) {
      this.setState({
        page: 1
      })
    }

    // const params = queryString.parse(this.props.location.search)
    // const pageParams = params.page || 1

    const params = new URLSearchParams(this.props.location.search)
    const pageParams = params.get('page') || 1

    if (pages !== prevState.pages || pageParams != page) {
      // if (isAtHomePage) return
      this.setState({
        page: pageParams,
        pages
      })
    }

    if (
      this.props.match.url === '/listings' &&
      !isAtHomePage &&
      sortOption !== prevProps.sortOption
    ) {
      this.props.getListings(page, sortOption, filters)
    }
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    const pageParams = params.get('page') || 1
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
      this.props.getListings(pageParams).then((response) => {
        this.setState({
          listings: this.props.listings,
          page: this.props.page,
          pages: this.props.pages,
          filters: this.props.filters
        })
      })
    } else if (this.props.match.url === '/listings/search') {
      const title = this.props.location.search.slice(7)
      const pageParams = this.props.location.search
      const pageNum = parseInt(pageParams.slice(6)) || 1

      this.props.searchListing({ title: title }, pageNum).then((response) => {
        this.setState({
          listings: this.props.listings,
          page: this.props.page,
          pages: this.props.pages
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

    const params = new URLSearchParams(this.props.location.search)
    const searchParams = params.get('query') || ''

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
    } else if (this.props.match.url === '/listings/search') {
      this.props.history.push(
        `${this.props.location.pathname}?query=${searchParams}&page=${pageNum}`
      )
    } else if (this.props.match.url === '/listings') {
      this.props.history.push({
        pathname: '/listings',
        search: `?page=${pageNum}`
      })
    } else if (this.props.match.url.slice(-5) === '/home') {
      this.props.history.push(
        `${this.props.location.pathname}?query=${searchParams}&page=${pageNum}`
      )
    }

    scroll.scrollToTop()
  }

  render() {
    const displayGoToPage = (
      <>
        Go to page:{' '}
        <input
          className="pagination-go-to-input"
          type="number"
          value={this.state.goToPage}
          onChange={({ target: { value } }) => {
            if (value < 0) value = 0
            if (value >= this.state.pages) value = this.state.pages

            this.setState({ goToPage: value })
          }}
          onKeyDown={({ key }) => {
            if (key === 'Enter')
              this.handlePage(_, { activePage: this.state.goToPage })
          }}
        ></input>
        <button
          onClick={() =>
            this.handlePage(_, { activePage: this.state.goToPage })
          }
        >
          Go
        </button>
      </>
    )

    if (
      Boolean(this.props.disabledListings.length) ||
      Boolean(this.props.listings && this.props.listings.length)
    ) {
      return (
        this.state.pages > 1 && (
          <div
            className={`pagination-wrapper ${
              isMobile ? 'device-mobile' : 'device-large'
            }`}
          >
            <Pagination
              ellipsisItem={'...'}
              onPageChange={this.handlePage}
              defaultActivePage={this.state.page}
              totalPages={this.state.pages}
              activePage={this.state.page}
            />{' '}
            {this.state.pages > 5 && displayGoToPage}
          </div>
        )
      )
    } else {
      return <div></div>
    }

    // return <Pagination ellipsisItem={null} boundaryRange={2} siblingRange={2} onPageChange={this.handlePage} defaultActivePage={this.state.page} totalPages={this.state.pages} />
  }
}

export default PaginationAll
