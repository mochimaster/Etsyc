import React from 'react'
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
    const { page, sortOption, match, location } = this.props

    if (match.url === 'listings' && sortOption !== prevProps.sortOption) {
      this.props.getListings(page, sortOption)
    }
  }

  // componentWillReceiveProps(newProps){
  //   // if newProps params have userID , need to filter.
  //   //
  //   // if(this.props.)
  //
  //   // if (newProps.)
  //
  //
  // }

  //listingsByAuthor = (9) [{…}, {…}, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

  // {match: {…}, location: {…}, history: {…}, staticContext: undefined, listings: Array(9), …}
  // deleteListing: ƒ deleteListing(id)
  // getListings: ƒ getListings()
  // history: {length: 50, action: "PUSH", location: {…}, createHref: ƒ, push: ƒ, …}
  // listings: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  // listingsByAuthor: (9) [{…}, {…}, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
  // location: {pathname: "/users/1/listings", search: "", hash: "", state: undefined}
  // match: {path: "/users/:userId/listings", url: "/users/1/listings", isExact: true, params: {…}}

  // componentWillReceiveProps(nextProps){
  //
  //   debugger
  //   // if (!this.props.match.params){
  //   // if(nextProps.match.params.userId){
  //     console.log("inside if condition of component will receive props.")
  //     this.setState({[this.props.listings]: nextProps.listingsByAuthor});
  //   // }
  //   debugger
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.post.id != nextProps.match.params.postId) {
  //     this.props.fetchPost(nextProps.match.params.postId);
  //   }
  // }

  // handlePage(e, {activePage}){
  //   let goToPage = { activePage }
  //   let pageNum = goToPage.activePage
  //   // let pageString = pageNum.toString()

  //   this.props.history.push({
  //     pathname: "/listings",
  //     search: `?page=${pageNum}`
  //   });
  //   this.props.getListings(pageNum);

  // }

  render() {
    const currentUrl = this.props.match.url
    const rootUrl = currentUrl.split('/')[1]

    if (rootUrl === 'users') {
      if (this.props.disabledListings.length) {
        return (
          <div>
            <ul className="index-wrapper">
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
        return <div className="body">You have no disabled listings.</div>
      }
    }

    if (
      this.props.match.path == '/search' &&
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
        <ReactLoading className="react-loading" type="bubbles" color="black" />
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
  }
  // {paginate}
}

export default ListingIndex
