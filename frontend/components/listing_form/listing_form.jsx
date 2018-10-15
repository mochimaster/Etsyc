import ListingFormContainer from './listing_form_container';
import React from 'react';

class ListingForm extends React.Component{

  constructor(props){
    super(props)
    this.state = this.props.listing
    this.state.author_id = this.props.sessionId
    debugger
  }

  updateTitle(e){
    this.setState({title: e.target.value})
  }

  updateOverview(e){

  }

  updateDescription(e){
    this.setState({description: e.target.value})
  }

  updateCategory(e){

  }

  updatePrice(e){

  }



  render() {



    return (
      <div className="create-listing-form-wrapper">
        <form className="create-form-wrapper" onSubmit={() => this.props.createListing(this.state)}>
          <div className="create-listing-photo create-listing-left-side">
            <p className="create-listing-photo-inner"> Add photo to server </p>
          </div>

          <div className="create-listing-right-side">
            <div className="create-listing-title">
              <label>Product Name:</label>
              <label className="required"> * </label>
              <br/>
              <input className="create-listing-title-input"
                onChange={this.updateTitle.bind(this)} value={this.state.title}
                type="text"/>
            </div>

            <div className="create-listing-overview">
              <label>Overview:</label>
              <br/>
              <textarea className="create-listing-overview-textarea"></textarea>
            </div>

            <div className="create-listing-description">
              <label>Description:</label>
              <label className="required"> * </label>
              <br/>
              <textarea className="create-listing-description-input"
                onChange={this.updateDescription.bind(this)}
                >
              </textarea>
            </div>

            <div className="create-listing-category">
              <label>Category:</label><label className="required"> * </label>

              <select className="create-listing-category-dropdown select-custom">
                <option value="jewelry-accessories">Jewelry & Accessories</option>
                <option value="home-living">Home & Living</option>
                <option value="art-collectibles">Art & Collectibles</option>
                <option value="vintage">Vintage</option>
              </select>
            </div>

            <div className="create-listing-price">
              <label >Price: </label>
              <label className="required"> * </label>
              <label className="dollar-margin"> $</label>
              <input className="create-list-price-input" type="number" min="0.00" max="99999999.99"
                step="0.01" value="0" />
            </div>

            <div className="create-listing-submit-button">
              <input className="submit-button btn-primary btn" type="submit" value="Submit Listing"/>
            </div>

          </div>



        </form>

      </div>

    )
  }
}

export default ListingForm;
