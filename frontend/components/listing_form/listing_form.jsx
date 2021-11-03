import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import Compress from 'compress.js'

import { BRANDS, CATEGORIES } from '../../../utils/constants'

const compressImage = async (imageFile) => {
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

const defaultListing = {
  title: '',
  description: '',
  overview: '',
  price: '',
  photo: '',
  imageUrl: '',
  condition: '',
  brand: '',
  photos: [],
  category: [],
  phoneNumber: '',
  photoUrls: []
}

export const ListingForm = (props) => {
  const [listing, setListing] = useState(defaultListing)

  const [photos, setPhotos] = useState([]) // new uploading photos

  const [photoHash, setPhotoHash] = useState({}) // existing photo urls
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)

  const preview = document.querySelector('#preview')
  const newPhotoNode = document.querySelector('#preview-new-photo')

  // removed  by Elliot
  // state.author_id = props.sessionId

  useEffect(() => {
    props.clearErrors()
  }, [props.formType])

  useEffect(() => {
    if (!props.match.params.listingId) return
    props.getListing(props.match.params.listingId).then((listing) => {
      // this.setState({ ...props.listing }, () => {
      if (props.listing && props.listing.photoUrls) {
        const tempPhotoHash = {}
        props.listing.photoUrls.forEach((_, index) => {
          tempPhotoHash[index] = true
        })
        setPhotoHash(tempPhotoHash)
      }
    })
  }, [props.match.params.listingId])

  useEffect(() => {
    if (props.listing) {
      setListing((prevListing) => ({
        ...prevListing,
        ...props.listing,
        phoneNumber: props.phoneNumber || props.listing.phoneNumber,
        merchantName: props.merchantName || props.listing.merchantName
      }))
    }
  }, [props.listing])

  useEffect(() => {
    if (preview) preview.innerHTML = ''

    for (let i = 0; i < listing.photoUrls.length; i++) {
      photoHash[i] = true
      previewExistingPhoto(listing.photoUrls[i], i)
    }
  }, [listing.photoUrls])

  useEffect(() => {
    if (newPhotoNode) newPhotoNode.innerHTML = ''
    // preview photos being uploaded.
    for (const photo of photos) {
      readAndPreview(photo)
    }
  }, [photos])

  useEffect(() => {}, [photoHash])

  const readAndPreview = (file) => {
    const fileReader = new FileReader()

    fileReader.addEventListener('load', function () {
      const image = new Image()
      image.title = file.name
      image.src = fileReader.result
      newPhotoNode.appendChild(image)
    })
    fileReader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    setIsSubmitLoading(true)
    e.preventDefault()

    const formData = new FormData()
    formData.append('listing[title]', listing.title)
    formData.append('listing[overview]', listing.overview)
    formData.append('listing[price]', listing.price)
    formData.append('listing[description]', listing.description)
    formData.append('listing[author_id]', props.sessionId)
    formData.append('listing[merchant_name]', listing.merchantName)
    formData.append('listing[category]', listing.category)
    // formData.append('category[category]', category)
    formData.append('user[phone_number]', listing.phoneNumber)
    formData.append('listing[condition]', listing.condition)
    formData.append('listing[brand]', listing.brand)

    if (props.match.params.listingId) {
      formData.append('listing[id]', props.match.params.listingId)
    }

    if (!!photos) {
      for (let i = 0; i < photos.length; i++) {
        const currentPhoto = photos[i]

        // only compress if image larger than 100 kb
        const compressedImage =
          currentPhoto.size > 100000
            ? await compressImage(currentPhoto)
            : currentPhoto

        formData.append('listing[photos][]', compressedImage)
      }
    }

    if (!!photoHash) {
      for (let i = 0; i < Object.keys(photoHash).length; i++) {
        formData.append('listing[photo_hash][]', photoHash[i])
      }
    }

    if (props.formType === 'Create Listing') {
      props
        .action(formData)
        .then(() => {
          props.history.push('/listings')
        })
        .always(() => {
          setIsSubmitLoading(false)
        })
    } else {
      props
        .action(formData)
        .then(() => {
          props.history.push(`/listings/${props.match.params.listingId}`)
        })
        .always(() => {
          setIsSubmitLoading(false)
        })
    }
  }

  const previewExistingPhoto = (photo, index) => {
    if (photoHash[index]) {
      const preview = document.querySelector('#preview')
      const button = document.createElement('button')

      preview.appendChild(button)
      button.addEventListener('click', () => deleteImage(index))

      button.innerText = 'X'
      button.type = 'button'
      button.className = `photo photo-${index} photo-x`

      const image = document.createElement('img')
      image.src = photo
      image.id = photo
      image.className = `photo photo-${index} photo-x`
      preview.appendChild(image)
    }
  }

  const deleteImage = (index) => {
    while (document.querySelector(`.photo-${index}`)) {
      const deleteImage = document.querySelector(`.photo-${index}`)
      deleteImage.parentNode.removeChild(deleteImage)
    }

    const copyPhotoHash = photoHash
    copyPhotoHash[index] = false

    setPhotoHash(copyPhotoHash)
  }

  const updateCategory = (categoryId) => {
    let oldCategory = listing.category

    if (oldCategory === '') {
      oldCategory = []
    }

    if (typeof oldCategory === 'string') {
      oldCategory = oldCategory.split(',')
    }

    if (oldCategory.includes(categoryId)) {
      oldCategory = oldCategory.filter(function (value) {
        return value !== categoryId
      })
    } else {
      oldCategory.push(categoryId)
    }
    setListing((listing) => ({ ...listing, category: oldCategory }))
  }

  const renderErrors = () => {
    return (
      <ul>
        {props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    )
  }

  const renderMerchantInputField = () => (
    <div>
      <label className="required"> * </label>
      <br />
      <input
        className="create-listing-merchant-input"
        onChange={({ target: { value } }) =>
          setListing((listing) => ({ ...listing, merchantName: value }))
        }
        value={listing.merchantName}
        type="text"
      />
    </div>
  )

  const renderCategoriesCheckbox = () => {
    return Object.entries(CATEGORIES).map(([key, value]) => (
      <>
        <input
          onChange={({ target: { value } }) => updateCategory(value)}
          type="checkbox"
          value={key}
          name={value}
          checked={listing.category.includes(key) ? true : false}
        />
        {value}
      </>
    ))
  }

  if (!props.listing) {
    return null
  }

  // Redirect user if logged in user is not the listing author.
  // explore try catch.
  if (props.formType === 'Edit Listing') {
    if (props.listing.author_id !== props.sessionId) {
      props.history.push(`/`)
      return null
    }
  }

  return (
    <div className="create-listing-form-wrapper">
      {renderErrors()}

      <form className="create-form-wrapper" onSubmit={handleSubmit}>
        <div className="create-listing-photo create-listing-left-side">
          <p className="create-listing-photo-inner">
            {' '}
            Multiple Images uploader
          </p>
          <input
            className="create-listing-photo-intake"
            type="file"
            onChange={({ currentTarget: { files } }) => {
              setPhotos((prevPhotos) => [...prevPhotos, ...files])
            }}
            value=""
            multiple
          />

          <div id="preview" />
          <div id="preview-new-photo" />
        </div>

        <div className="create-listing-right-side">
          <div className="create-listing-merchant_name">
            <label>Merchant Name:</label>
            {listing.merchantName ? (
              <p>{listing.merchantName}</p>
            ) : (
              renderMerchantInputField()
            )}
          </div>

          <div className="create-listing-phone-number">
            <label>Phone Number:</label>
            <br />
            <input
              className="create-listing-phone-number-input"
              onChange={({ target: { value } }) =>
                setListing((listing) => ({ ...listing, phoneNumber: value }))
              }
              value={listing.phoneNumber}
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
                setListing((listing) => ({ ...listing, title: value }))
              }
              value={listing.title}
              type="text"
            />
          </div>

          <div className="create-listing-overview">
            <label className="title-label">Overview:</label>
            <label className="required"> * </label>
            <br />
            <textarea
              onChange={({ target: { value } }) =>
                setListing((listing) => ({ ...listing, overview: value }))
              }
              className="create-listing-overview-textarea"
              value={listing.overview}
            />
          </div>

          <div className="create-listing-description">
            <label className="title-label">Description:</label>
            <label className="required"> * </label>
            <br />
            <textarea
              className="create-listing-description-input"
              onChange={({ target: { value } }) =>
                setListing((listing) => ({ ...listing, description: value }))
              }
              value={listing.description}
            />
          </div>

          <div className="create-listing-category">
            <label>Category:</label>
            <label className="required"> * </label>

            <div className="create-listing-category-radio">
              {renderCategoriesCheckbox()}
            </div>
          </div>
          <div className="create-listing-condition">
            <label for="condition">Condition: </label>

            <select
              name="condition"
              id="condition"
              onChange={({ target: { value } }) =>
                setListing((listing) => ({ ...listing, condition: value }))
              }
              value={listing.condition}
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
                setListing((listing) => ({ ...listing, brand: value }))
              }
              value={listing.brand}
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
                setListing((listing) => ({ ...listing, price: value }))
              }
              value={listing.price}
            />
          </div>

          <div className="create-listing-submit-button">
            <input
              className="submit-button btn-primary btn"
              type="submit"
              value={isSubmitLoading ? 'Loading...' : props.formType}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default withRouter(ListingForm)
