import React from 'react'
import ListingIndexItem from '../listing_index/listing_index_item'
import ListingIndex from '../listing_index/listing_index_container'


class CategoryShow extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            listings: []
        }
    }

    componentDidMount(){
        this.props.getListingsByCategory(this.props.category).then((listings) => 
            this.setState({
                listings: listings 
            }), console.log("after calling set state. this.state: ", this.state))
    }

    render(){
        return <div>
              <ul className="index-wrapper">
                {this.props.listings.map(listing => {
                  return <ListingIndexItem key={listing.id} listing={listing} deleteListing={this.props.deleteListing} />;
                })}
              </ul>
            </div>
        // return <div>
        //       <ul className="index-wrapper">
        //         {this.props.listings.map(listing => {
        //           return <ListingIndex key={listing.id} listing={listing} deleteListing={this.props.deleteListing} />;
        //         })}
        //       </ul>
        //     </div>

    }
}

export default CategoryShow;