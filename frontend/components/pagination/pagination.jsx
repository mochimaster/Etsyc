import React from 'react'
import {Pagination} from 'semantic-ui-react'
import { replace } from 'lodash'

class PaginationAll extends React.Component{

    constructor(props){
        super(props)
        this.state={
            listings: props.listings,
            page: 1,
            pages: 1
        }
        this.handlePage = this.handlePage.bind(this)
    }

    componentDidMount() {
        // prevent getListings firing again after search result is returned
        // if (this.props.match.path == "/search") {
        //     return null
        // }


        let action = undefined
        if(this.props.match.url === "/categories"){
            const categoryId = this.props.location.pathname.slice(12);
            const pageParams = this.props.location.search
            const pageNum = parseInt(pageParams.slice(6))

            this.props.getListingsByCategory(categoryId, pageNum).then(response => {
                this.setState({
                    listings: this.props.listings,
                    page: this.props.page,
                    pages: this.props.pages
                })
            })
        // } else if(this.props.match.url === "/listings"){
        //     this.props.getListings(pageNum).then(response => {
        //         this.setState({
        //             listings: this.props.listings,
        //             page: this.props.page,
        //             pages: this.props.pages
        //         });
        //     });
        } else if(this.props.match.url === "/search"){
            const title = this.props.location.search.slice(7);


            this.props.searchListing({title: title}, 1).then(response => {
                this.setState({
                    listings: this.props.listings,
                    page: this.props.page,
                    pages: this.props.pages
                });
            });
        }



    }

    handlePage(e, { activePage }) {
        let goToPage = { activePage }
        let pageNum = goToPage.activePage
        // let pageString = pageNum.toString()

        // this.props.history.push({
        //     pathname: this.props.location.pathname,
        //     search: `?page=${pageNum}`
        // });


        if (this.props.match.url === "/categories") {
            this.props.history.push(`${this.props.location.pathname}?page=${pageNum}`)
            const categoryId = this.props.location.pathname.slice(12);

            this.props.getListingsByCategory(categoryId, pageNum)
        } else if (this.props.match.url === "/search"){
            const searchQuery = this.props.location.search.slice(7)
            this.props.history.push(`/${this.props.location.pathname}?query=${searchQuery}&page=${pageNum}`);
        }
        // } else if (this.props.match.url === "/listings"){
        //     this.props.getListings(pageNum);
        // }

    }

    render(){

        // return <div className="pagination-wrapper">
        //     <Pagination ellipsisItem={null} boundaryRange={2} siblingRange={2} onPageChange={this.handlePage} defaultActivePage={this.state.page} totalPages={this.state.pages} />
        //   </div>;
        return <Pagination ellipsisItem={null} boundaryRange={2} siblingRange={2} onPageChange={this.handlePage} defaultActivePage={this.state.page} totalPages={this.state.pages} />

    }
}

export default PaginationAll;