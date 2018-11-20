import ListingFormContainer from './listing_form_container';
import React from 'react';
import { withRouter } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
// import ListingEditFormContainer from './listing_edit_form_container';
import {createReview} from '../../actions/review_actions';


class ListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.listing ? props.listing.title : "",
      description: props.listing ? props.listing.description : "",
      overview: props.listing ? props.listing.overview : "",
      price: props.listing ? props.listing.price : "",
      photo: props.listing ? props.listing.photo : "",
      imageUrl: null,
      merchantName: props.merchantName ? props.merchantName : "",
      photos: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.imagePreview = this.imagePreview.bind(this);
  }
  // removed  by Elliot
  // this.state.author_id = this.props.sessionId
  componentDidMount() {
    if (this.props.formType === "Create Listing") {
    } else {
      this.props.getListing(this.props.match.params.listingId).then(() => {
        // console.log("calling setstate");
        this.setState({ ...this.props.listing }, () => {});
      });
    }
    // this.setState({listing:this.props.listing});
    // if(this.props.formType === 'Edit Listing'){
    //   console.log("inside if statement.")
    //   this.props.getListing(this.props.match.params.listingId)
    // } else {
    //   console.log("inside else.")
    //   return null
    // }
  }

  handleSubmit(e) {
    // debugger
    e.preventDefault();
    const formData = new FormData();
    formData.append("listing[title]", this.state.title);
    formData.append("listing[overview]", this.state.overview);
    formData.append("listing[price]", this.state.price);
    formData.append("listing[description]", this.state.description);
    formData.append("listing[author_id]", this.props.sessionId);
    formData.append("listing[merchant_name]", this.props.merchantName);

    if (this.props.match.params.listingId) {
      formData.append("listing[id]", this.props.match.params.listingId);
    }

    // if (!!this.state.imageUrl) {
    //   formData.append("listing[photo]", this.state.imageFile);
    // }


    


    // multiple
 
    if (!!this.state.photos){
      for (let i = 0; i < this.state.photos.length; i++) {
        // formData.append("listing[photo][]", this.state.photos[i]);
        formData.append("listing[photos][]", this.state.photos[i]);
      }
    }



    this.props
      .action(formData)
      .then(() => this.props.history.push("/listings/"));
    // .then((listing) => this.props.history.push(`/listings/${listing.id}`));
    // .then((listing) => this.props.history.push(`/listings/${listing.id}`));
  }

  // loadPreview(e){
  //   const reader = new FileReader();
  //   const file = e.currentTarget.files[0];

  //   reader.onloadend = () =>
  //     this.setState({ imageUrl: reader.result, imageFile: file});

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   } else {
  //     this.setState({ imageUrl: "", imageFile: null });
  //   }

  // }

  // imagePreview(e){
  //   const reader = new FileReader();

  //   const file = e.currentTarget.files[0];
  //   reader.onloadend = () =>
  //     this.setState({ imageUrl: reader.result, imageFile: file});

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   } else {
  //     this.setState({ imageUrl: "", imageFile: null });
  //   }
  // }

  // imagePreview(e){
  //   // debugger
  //   if (e.currentTarget.files){

  //     let numFiles = e.currentTarget.files.length;

  //     for (let i =0; i< numFiles; i++){
  //       let reader = new FileReader();

  //       let files = e.currentTarget.files[0];

  //       reader.onload = () =>
  //         this.setState({ imageUrl: reader.result, imageFile: files});

  //       if (files) {
  //         reader.readAsDataURL(files);
  //       } else {
  //         this.setState({ imageUrl: "", imageFile: null });
  //       }
  //     }
  //   }
  // }

  imagePreview2(e) {
    // debugger
    if (e.currentTarget.files) {
      let numFiles = e.currentTarget.files.length;

      for (let i = 0; i < numFiles; i++) {
        let reader = new FileReader();

        let files = e.currentTarget.files[0];

        reader.onload = () =>
          this.setState({ imageUrl: reader.result, imageFile: files });

        if (files) {
          reader.readAsDataURL(files);
        } else {
          this.setState({ imageUrl: "", imageFile: null });
        }
      }
    }
  }

  imagePreview(e) {
    let preview = document.querySelector("#preview");
    // debugger
    // if (e.currentTarget.files) {
    if (e) {
      // debugger
      // console.log(e.currentTarget.files);

      this.setState({ imageFile: e.currentTarget.files },
        console.log());

      [].forEach.call(e.currentTarget.files, readAndPreview.bind(this));


      // console.log("Before this.state.photos")
      // console.log(this.state.photos);
      // console.log(this.state.imageFile);
    } else if (this.props.listing.photoUrls) {
      [].forEach.call(this.props.listing.photoUrls, readAndPreview.bind(this));
    }

    function readAndPreview(file) {
      // debugger
      let reader = new FileReader();
      // console.log("this.state.photos: "+ this.state.photos);
      // console.log(file);

      // .push returns the new length of the array as an interger! 
      // this.setState({photos: this.state.photos.push(file)},
      //   () => {debugger})

      // this.setState({photos: [...this.state.photos, file]},
      //   console.log("finish set state"))

      this.setState(prevState => ({
        photos: [...prevState.photos, file]
      }))

      
      reader.addEventListener(
        "load",
        function() {
          let image = new Image();
          // image.height = 100;
          image.title = file.name;
          image.src = this.result;
          preview.appendChild(image);
          // debugger

        },
        false
      );

      reader.readAsDataURL(file);

      // if (typeof(file) == "string"){
      //   // console.log(file);
      //   // return (<img src = {file} />);
      // } else {
      //   reader.readAsDataURL(file);
      // }
    }
  }

  updateTitle(e) {
    this.setState({ title: e.target.value });
  }

  updateOverview(e) {
    this.setState({ overview: e.target.value });
  }

  updateDescription(e) {
    this.setState({ description: e.target.value });
  }

  updateCategory(e) {}

  updatePrice(e) {
    this.setState({ price: e.target.value });
  }

  updateMerchantName(e) {
    this.setState({ merchantName: e.target.value });
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  merchantExist() {
    let name;
    if (!this.props.merchantName) {
      name = (
        <div>
          <label className="required"> * </label>
          <br />
          <input
            className="create-listing-merchant-input"
            onChange={this.updateMerchantName.bind(this)}
            value={this.state.merchantName}
            type="text"
          />
        </div>
      );
    } else {
      name = <p>{this.state.merchantName}</p>;
    }
    return name;
  }

  render() {
    // debugger
    if (!this.props.listing) {
      return null;
    }

    // Redirect user if logged in user is not the listing author.
    // explore try catch.
    if (this.props.formType === "Edit Listing") {
      if (this.props.listing.author_id !== this.props.sessionId) {
        this.props.history.push(`/`);
        return null;
      }
    }

    // check if it has single or multiple images
    // if (this.props.listing.photoUrls){
    //   this.imagePreview();
    // }

    // ----------------------------

    // const reader = new FileReader();
    // const file = e.currentTarget.files[0];
    // reader.onloadend = () =>
    //   this.setState({ imageUrl: reader.result, imageFile: file});
    //
    // if (file) {
    //   reader.readAsDataURL(file);
    // } else {
    //   this.setState({ imageUrl: "", imageFile: null });
    // }

    // ----------------------------

    // const preview = this.state.imageUrl ? <img src={this.state.imageUrl} /> : null

    // let preview="";
    // debugger
    // if (this.props.formType === 'Edit Listing'){
    //   preview = <img src={this.props.listing.photoUrl} />
    // } else {
    //   preview = this.state.imageUrl ? <img src={this.state.imageUrl} /> : null
    // }

    //onSubmit={() => this.props.createListing(this.state)}
    // { preview }
    return (
      <div className="create-listing-form-wrapper">
        {this.renderErrors()}

        <form className="create-form-wrapper" onSubmit={this.handleSubmit}>
          <div className="create-listing-photo create-listing-left-side">
            <p className="create-listing-photo-inner"> Multiple Images uploader</p>
            <input
              className="create-listing-photo-intake"
              type="file"
              onChange={this.imagePreview}
              value=""
              multiple
            />
            
            <div id="preview" />
          </div>

          <div className="create-listing-right-side">
            <div className="create-listing-merchant_name">
              <label>Merchant Name:</label>
              {this.merchantExist()}
            </div>

            <div className="create-listing-title">
              <label>Product Name:</label>
              <label className="required"> * </label>
              <br />
              <input
                className="create-listing-title-input"
                onChange={this.updateTitle.bind(this)}
                value={this.state.title}
                type="text"
              />
            </div>

            <div className="create-listing-overview">
              <label className="title-label">Overview:</label>
              <label className="required"> * </label>

              <br />
              <textarea
                onChange={this.updateOverview.bind(this)}
                className="create-listing-overview-textarea"
              >
                {this.state.overview}
              </textarea>
            </div>

            <div className="create-listing-description">
              <label className="title-label">Description:</label>
              <label className="required"> * </label>
              <br />
              <textarea
                className="create-listing-description-input"
                onChange={this.updateDescription.bind(this)}
                value={this.state.description}
              />
            </div>

            {/*
            <div className="create-listing-category">
              <label>Category:</label><label className="required"> * </label>

              <select className="create-listing-category-dropdown select-custom">
                <option value="jewelry-accessories">Jewelry & Accessories</option>
                <option value="home-living">Home & Living</option>
                <option value="art-collectibles">Art & Collectibles</option>
                <option value="vintage">Vintage</option>
              </select>
            </div>
            */}

            <div className="create-listing-price">
              <label>Price: </label>
              <label className="required"> * </label>
              <label className="dollar-margin"> $</label>
              <input
                className="create-list-price-input"
                type="number"
                min="0.00"
                max="99999999.99"
                step="0.01"
                onChange={this.updatePrice.bind(this)}
                value={this.state.price}
              />
            </div>

            <div className="create-listing-submit-button">
              <input
                className="submit-button btn-primary btn"
                type="submit"
                value={this.props.formType}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default withRouter(ListingForm);
