import ListingFormContainer from './listing_form_container'
import React from 'react'
import { withRouter } from 'react-router-dom'
// import ListingEditFormContainer from './listing_edit_form_container';
import { BRANDS, CONDITION, CATEGORIES } from '../../../utils/constants'
import Compress from 'compress.js'

class ListingForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: props.listing ? props.listing.title : '',
      description: props.listing ? props.listing.description : '',
      overview: props.listing ? props.listing.overview : '',
      price: props.listing ? props.listing.price : '',
      photo: props.listing ? props.listing.photo : '',
      imageUrl: null,
      merchantName: props.merchantName ? props.merchantName : '',
      condition: props.condition ? props.condition : CONDITION.NEW,
      brand: props.brand ? props.brand : BRANDS.WEST_ELM,
      photos: [],
      // photos: props.listing ? props.listing.photoUrls : "",
      // category: props.listing ? props.listing.category.split(",") : []
      category: props.listing ? props.listing.category : [],
      phoneNumber: props.phoneNumber ? props.phoneNumber : '',
      photoHash: {},
      isSubmitLoading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.imagePreview = this.imagePreview.bind(this)
    this.previewExistingPhoto = this.previewExistingPhoto.bind(this)
    this.updateState = this.updateState.bind(this)
  }
  // removed  by Elliot
  // this.state.author_id = this.props.sessionId
  componentDidMount() {
    this.props.clearErrors()

    if (this.props.formType === 'Create Listing') {
    } else {
      this.props
        .getListing(this.props.match.params.listingId)
        .then((listing) => {
          this.setState({ ...this.props.listing }, () => {
            if (this.props.listing && this.props.listing.photoUrls) {
              let photoHash = {}
              this.props.listing.photoUrls.forEach((_, index) => {
                photoHash[index] = true
              })
              this.setState({ photoHash: photoHash })
            }
          })
        })
    }
  }

  async compressImage(imageFile) {
    const compress = new Compress()

    const compressedImage = await compress
      .compress([imageFile], {
        size: 3, // the max size in MB, defaults to 2MB
        quality: 0.4, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: true // defaults to true, set false if you do not want to resize the image width and height
      })
      .then((results) => {
        const img1 = results[0]
        const base64str = img1.data
        const imgExt = img1.ext
        const compressed = Compress.convertBase64ToFile(base64str, imgExt)

        const file = new File([compressed], img1.alt)
        return file
      })
    return compressedImage
  }

  async handleSubmit(e) {
    this.setState({ isSubmitLoading: true })
    e.preventDefault()

    const formData = new FormData()
    formData.append('listing[title]', this.state.title)
    formData.append('listing[overview]', this.state.overview)
    formData.append('listing[price]', this.state.price)
    formData.append('listing[description]', this.state.description)
    formData.append('listing[author_id]', this.props.sessionId)
    formData.append('listing[merchant_name]', this.props.merchantName)
    formData.append('listing[category]', this.state.category)
    formData.append('category[category]', this.state.category)
    formData.append('user[phone_number]', this.state.phoneNumber)
    formData.append('listing[condition]', this.state.condition)
    formData.append('listing[brand]', this.state.brand)

    if (this.props.match.params.listingId) {
      formData.append('listing[id]', this.props.match.params.listingId)
    }

    if (!!this.state.photos) {
      for (let i = 0; i < this.state.photos.length; i++) {
        const currentPhoto = this.state.photos[i]

        // only compress if image larger than 100 kb
        const compressedImage =
          currentPhoto.size > 100000
            ? await this.compressImage(currentPhoto)
            : currentPhoto

        formData.append('listing[photos][]', compressedImage)
      }
    }

    if (!!this.state.photoHash) {
      for (let i = 0; i < Object.keys(this.state.photoHash).length; i++) {
        formData.append('listing[photo_hash][]', this.state.photoHash[i])
      }
    }

    if (this.props.formType === 'Create Listing') {
      this.props
        .action(formData)
        .then(() => {
          this.props.history.push('/listings')
        })
        .always(() => {
          this.setState({ isSubmitLoading: false })
        })
    } else {
      this.props
        .action(formData)
        .then(() => {
          this.props.history.push(
            `/listings/${this.props.match.params.listingId}`
          )
        })
        .always(() => {
          this.setState({ isSubmitLoading: false })
        })
    }
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

  imagePreview(e) {
    let preview = document.querySelector('#preview')
    // if (e.currentTarget.files) {
    if (e) {
      this.setState({ imageFile: e.currentTarget.files })
      ;[].forEach.call(e.currentTarget.files, readAndPreview.bind(this))
    }

    // else if (this.props.listing.photoUrls) {
    //   [].forEach.call(this.props.listing.photoUrls, readAndPreview.bind(this));
    // }

    function readAndPreview(file) {
      // debugger;
      let reader = new FileReader()
      // console.log("this.state.photos: "+ this.state.photos);
      // console.log(file);

      // .push returns the new length of the array as an interger!
      // this.setState({photos: this.state.photos.push(file)},
      //   () => {debugger})

      // this.setState({photos: [...this.state.photos, file]},
      //   console.log("finish set state"))

      this.setState(
        (prevState) => ({
          photos: [...prevState.photos, file]
        }),
        () => {}
      )

      reader.addEventListener(
        'load',
        function () {
          // let image = new Image(320 , 416	);
          let image = new Image()
          // image.height = 200;
          // image.width = 100;
          image.title = file.name
          image.src = this.result
          preview.appendChild(image)
        }
        // preventDefault(),
        // {capture: false}
      )
      reader.readAsDataURL(file)
    }
  }

  previewExistingPhoto(photo, index) {
    if (this.state.photoHash[index]) {
      let preview = document.querySelector('#preview')
      let button = document.createElement('button')

      preview.appendChild(button)
      // debugger
      button.addEventListener(
        'click',
        function () {
          this.deleteImage(index)
        }.bind(this)
      )

      button.innerText = 'X'
      button.type = 'button'
      button.className = `photo photo-${index} photo-x`

      let image = document.createElement('img')
      image.src = photo
      image.id = photo
      image.className = `photo photo-${index} photo-x`
      preview.appendChild(image)
    }
  }

  deleteImage(index) {
    while (document.querySelector(`.photo-${index}`)) {
      let deleteImage = document.querySelector(`.photo-${index}`)
      deleteImage.parentNode.removeChild(deleteImage)
    }

    const copyPhotoHash = this.state.photoHash
    copyPhotoHash[index] = false

    this.setState({ photoHash: copyPhotoHash })
  }

  updateState(property, value) {
    this.setState({ [property]: value })
  }

  updateMerchantName(e) {
    this.setState({ merchantName: e.target.value })
  }

  updateCategory(e) {
    let oldCategory = this.state.category

    if (oldCategory === '') {
      oldCategory = []
    }

    if (typeof oldCategory === 'string') {
      oldCategory = oldCategory.split(',')
    }

    if (oldCategory.includes(e.target.value)) {
      oldCategory = oldCategory.filter(function (value, index, arr) {
        return value !== e.target.value
      })
    } else {
      oldCategory.push(e.target.value)
    }
    this.setState({ category: oldCategory })
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    )
  }

  merchantExist() {
    let name
    if (!this.props.merchantName) {
      name = (
        <div>
          <label className="required"> * </label>
          <br />
          <input
            className="create-listing-merchant-input"
            onChange={({ target: { value } }) =>
              this.updateState('merchantName', value)
            }
            value={this.state.merchantName}
            type="text"
          />
        </div>
      )
    } else {
      name = <p>{this.state.merchantName}</p>
    }
    return name
  }

  renderCategoriesCheckbox() {
    return Object.entries(CATEGORIES).map(([key, value]) => (
      <>
        <input
          onChange={this.updateCategory.bind(this)}
          type="checkbox"
          value={key}
          name={value}
          checked={this.state.category.includes(key) ? true : false}
        />
        {value}
      </>
    ))
  }

  render() {
    if (!this.props.listing) {
      return null
    }

    // Redirect user if logged in user is not the listing author.
    // explore try catch.
    if (this.props.formType === 'Edit Listing') {
      if (this.props.listing.author_id !== this.props.sessionId) {
        this.props.history.push(`/`)
        return null
      }
    }

    if (this.state.photoUrl) {
      let preview = document.querySelector('#preview')
      preview.innerHTML = ''
      this.previewExistingPhoto(this.state.photoUrl, 0)
    }

    if (this.state.photoUrls) {
      let preview = document.querySelector('#preview')
      preview.innerHTML = ''

      // [].forEach.call(
      //   this.state.photoUrls,
      //   this.previewExistingPhoto.bind(this)
      // );
      let photoHash = {}
      for (let i = 0; i < this.state.photoUrls.length; i++) {
        this.previewExistingPhoto(this.state.photoUrls[i], i)
        photoHash[i] = true
      }
    }

    return (
      <div className="create-listing-form-wrapper">
        {this.renderErrors()}

        <form className="create-form-wrapper" onSubmit={this.handleSubmit}>
          <div className="create-listing-photo create-listing-left-side">
            <p className="create-listing-photo-inner">
              {' '}
              Multiple Images uploader
            </p>
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
            <div className="create-listing-phone-number">
              <label>Phone Number:</label>
              <br />
              <input
                className="create-listing-phone-number-input"
                onChange={({ target: { value } }) =>
                  this.updateState('phoneNumber', value)
                }
                value={this.state.phoneNumber}
                type="text"
              />
            </div>
            <div className="create-listing-title">
              <label>Product Name:</label>
              <label className="required"> * </label>
              <br />
              <input
                className="create-listing-title-input"
                onChange={({ target: { value } }) =>
                  this.updateState('title', value)
                }
                value={this.state.title}
                type="text"
              />
            </div>
            <div className="create-listing-overview">
              <label className="title-label">Overview:</label>
              <label className="required"> * </label>

              <br />
              <textarea
                onChange={({ target: { value } }) =>
                  this.updateState('overview', value)
                }
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
                onChange={({ target: { value } }) =>
                  this.updateState('description', value)
                }
                value={this.state.description}
              />
            </div>
            {/* <div className="create-listing-category">
              <label>Category:</label><label className="required"> * </label>

              <select className="create-listing-category-dropdown select-custom">
                <option value="jewelry-accessories">Jewelry & Accessories</option>
                <option value="home-living">Home & Living</option>
                <option value="art-collectibles">Art & Collectibles</option>
                <option value="vintage">Vintage</option>
              </select>
            </div> */}
            <div className="create-listing-category">
              <label>Category:</label>
              <label className="required"> * </label>

              <div className="create-listing-category-radio">
                {this.renderCategoriesCheckbox()}
              </div>
            </div>
            <div className="create-listing-condition">
              <label for="condition">Condition: </label>

              <select
                name="condition"
                id="condition"
                onChange={({ target: { value } }) =>
                  this.updateState('condition', value)
                }
                value={this.state.condition}
              >
                <option value="new">New</option>
                <option value="like new">Like New</option>
                <option value="used">Used</option>
              </select>
            </div>
            <div className="create-listing-brand">
              <label for="brand">Brand: </label>

              <select
                name="brand"
                id="brand"
                onChange={({ target: { value } }) =>
                  this.updateState('brand', value)
                }
                value={this.state.brand}
              >
                {Object.values(BRANDS).map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </div>
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
                onChange={({ target: { value } }) =>
                  this.updateState('price', value)
                }
                value={this.state.price}
              />
            </div>

            <div className="create-listing-submit-button">
              <input
                className="submit-button btn-primary btn"
                type="submit"
                value={
                  this.state.isSubmitLoading
                    ? 'Loading...'
                    : this.props.formType
                }
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(ListingForm)
