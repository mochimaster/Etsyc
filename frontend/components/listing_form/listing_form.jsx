import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import Compress from 'compress.js'

import { BRANDS, CATEGORIES } from '../../../utils/constants'
import { CONDITION } from '../condition_slider/condition_slider'

const PHOTO_POSITION = {
  UP: 'up',
  DOWN: 'down'
}

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
  condition: 'new',
  detailedCondition: '',
  brand: '',
  photos: [],
  category: [],
  phoneNumber: '',
  photoUrls: [],
  internalNote: '',
  internalPhotos: [],
  internalPhotoUrls: [],
  photosOrder: []
}

export const ListingForm = (props) => {
  const [photosUpdate, setPhotosUpdate] = useState({})
  const [internalPhotosUpdate, setInternalPhotosUpdate] = useState({})

  const [listing, setListing] = useState(defaultListing)

  const [photos, setPhotos] = useState([]) // new uploading photos
  const [internalPhotos, setInternalPhotos] = useState([]) // new uploading photos

  const [isSubmitLoading, setIsSubmitLoading] = useState(false)

  const preview = document.querySelector('#preview')
  const newPhotoNode = document.querySelector('#preview-new-photo')
  const newInternalPhotoNode = document.querySelector(
    '#preview-new-internal-photo'
  )
  const previewExistingInternalPhoto = document.querySelector(
    '#preview-existing-internal-photo'
  )

  useEffect(() => {
    props.clearErrors()
  }, [props.formType])

  useEffect(() => {
    if (!props.match.params.listingId) return
    props.getListing(props.match.params.listingId, props.sessionId)
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
    const tempPhotosUpdate = {}
    listing.photoUrls.forEach((photoListingUrl, index) => {
      const position =
        props.listing.photosOrder &&
        props.listing.photosOrder.indexOf(photoListingUrl) > -1
          ? props.listing.photosOrder.indexOf(photoListingUrl)
          : index

      tempPhotosUpdate[photoListingUrl] = {
        photoListingUrl,
        delete: false,
        position
      }

      setPhotosUpdate(tempPhotosUpdate)
    })
  }, [listing.photoUrls])

  useEffect(() => {
    const tempInternalPhotosUpdate = {}
    listing.internalPhotoUrls.forEach((internalPhotoUrl, index) => {
      tempInternalPhotosUpdate[internalPhotoUrl] = {
        internalPhotoUrl,
        delete: false,
        position: index
      }
    })

    setInternalPhotosUpdate(tempInternalPhotosUpdate)
  }, [listing.internalPhotoUrls])

  useEffect(() => {
    if (preview) preview.innerHTML = ''

    const sortedEnabledPhotosUpdate = Object.values(photosUpdate)
      .filter((photoUpdate) => !photoUpdate.delete)
      .sort((a, b) => a.position - b.position)

    sortedEnabledPhotosUpdate.forEach((photoUpdate) =>
      previewExistingPhoto(photoUpdate.photoListingUrl, photoUpdate.position)
    )
  }, [photosUpdate])

  useEffect(() => {
    if (previewExistingInternalPhoto)
      previewExistingInternalPhoto.innerHTML = ''

    Object.values(internalPhotosUpdate)
      .filter((internalPhotoUpdate) => !internalPhotoUpdate.delete)
      .forEach((internalPhotoUpdate, index) => {
        previewExistingPhoto(internalPhotoUpdate.internalPhotoUrl, index, true)
      })
  }, [internalPhotosUpdate])

  useEffect(() => {
    if (newPhotoNode) newPhotoNode.innerHTML = ''
    if (newInternalPhotoNode) newInternalPhotoNode.innerHTML = ''
    // preview photos being uploaded.
    for (const photo of photos) {
      readAndPreviewNewPhoto(photo)
    }

    for (const internalPhoto of internalPhotos) {
      readAndPreviewNewPhoto(internalPhoto, true)
    }
  }, [photos, internalPhotos])

  const readAndPreviewNewPhoto = (file, isInternal = false) => {
    const fileReader = new FileReader()

    fileReader.addEventListener('load', function () {
      const image = new Image()
      image.title = file.name
      image.src = fileReader.result
      isInternal
        ? newInternalPhotoNode.append(image)
        : newPhotoNode.appendChild(image)
    })
    fileReader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const photosToDelete = {}
    Object.keys(photosUpdate).map((photoUpdateKey) => {
      photosToDelete[photoUpdateKey] = photosUpdate[photoUpdateKey]['delete']
    })

    const internalPhotosToDelete = {}
    Object.keys(internalPhotosUpdate).map((internalPhotoUpdateKey) => {
      internalPhotosToDelete[internalPhotoUpdateKey] =
        internalPhotosUpdate[internalPhotoUpdateKey]['delete']
    })

    const populatedPhotoOrder = []
    const sortedEnabledPhotosUpdate = Object.values(photosUpdate)
      .filter((photoUpdate) => !photoUpdate.delete)
      .sort((a, b) => a.position - b.position)

    sortedEnabledPhotosUpdate.forEach((photoUpdate) =>
      populatedPhotoOrder.push(photoUpdate.photoListingUrl)
    )

    setIsSubmitLoading(true)

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
    formData.append('listing[detailed_condition]', listing.detailedCondition)
    formData.append('listing[brand]', listing.brand)
    formData.append('listing[internal_note]', listing.internalNote)

    for (const photoListingUrl of populatedPhotoOrder) {
      formData.append('listing[photos_order][]', photoListingUrl)
    }

    if (props.match.params.listingId) {
      formData.append('listing[id]', props.match.params.listingId)
    }

    // Compress customer facing photos
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

    // Compress internal facing photos
    if (!!internalPhotos) {
      for (let i = 0; i < internalPhotos.length; i++) {
        const currentPhoto = internalPhotos[i]

        // only compress if image larger than 100 kb
        const compressedImage =
          currentPhoto.size > 100000
            ? await compressImage(currentPhoto)
            : currentPhoto

        formData.append('listing[internal_photos][]', compressedImage)
      }
    }

    if (photosToDelete && props.formType === 'Edit Listing') {
      for (const photoUrl of listing.photoUrls) {
        formData.append(
          `listing[photos_to_delete][${photoUrl}]`,
          photosUpdate[photoUrl]['delete']
        )
      }
    }

    if (internalPhotosToDelete && props.formType === 'Edit Listing') {
      for (const internalPhotoUrl of listing.internalPhotoUrls) {
        formData.append(
          `listing[internal_photos_to_delete][${internalPhotoUrl}]`,
          internalPhotosUpdate[internalPhotoUrl]['delete']
        )
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

  const updatePhotoPosition = (photoUrl, position) => {
    const copyPhotosUpdate = { ...photosUpdate }
    const originalPosition = parseInt(photosUpdate[photoUrl]['position'])

    if (position === PHOTO_POSITION.UP && originalPosition > 0) {
      for (const copyPhotoUpdateKey in copyPhotosUpdate) {
        if (
          copyPhotosUpdate[copyPhotoUpdateKey]['position'] ==
          originalPosition - 1
        ) {
          copyPhotosUpdate[copyPhotoUpdateKey]['position'] = `${
            parseInt(copyPhotosUpdate[copyPhotoUpdateKey]['position']) + 1
          }`
        }
      }

      copyPhotosUpdate[photoUrl]['position'] = `${originalPosition - 1}`
      setPhotosUpdate(copyPhotosUpdate)
    }

    if (
      position === PHOTO_POSITION.DOWN &&
      originalPosition < Object.keys(copyPhotosUpdate).length - 1
    ) {
      for (const copyPhotoUpdateKey in copyPhotosUpdate) {
        if (
          copyPhotosUpdate[copyPhotoUpdateKey]['position'] ==
          originalPosition + 1
        ) {
          copyPhotosUpdate[copyPhotoUpdateKey]['position'] = `${
            parseInt(copyPhotosUpdate[copyPhotoUpdateKey]['position']) - 1
          }`
        }
      }

      copyPhotosUpdate[photoUrl]['position'] = `${originalPosition + 1}`
      setPhotosUpdate(copyPhotosUpdate)
    }
  }

  const deleteImageById = (photoUrl) => {
    while (document.getElementById(photoUrl)) {
      const deleteImage = document.getElementById(photoUrl)
      deleteImage.parentNode.removeChild(document.getElementById(photoUrl))
    }
  }

  const previewExistingPhoto = (photo, index, isInternalPhoto = false) => {
    const preview = isInternalPhoto
      ? document.querySelector('#preview-existing-internal-photo')
      : document.querySelector('#preview')

    const deleteButton = document.createElement('button')
    const upButton = document.createElement('button')
    const downButton = document.createElement('button')

    preview.appendChild(deleteButton)
    preview.appendChild(downButton)
    preview.appendChild(upButton)

    deleteButton.addEventListener('click', () => {
      /* 
        set position of photos since a photo in between could be delete
        only supported for customer facing photos (not internal photos)
      */
      if (!isInternalPhoto) {
        const photoPosition = parseInt(photosUpdate[photo]['position'])

        const copyPhotosUpdate = { ...photosUpdate }

        for (const copyPhotoUpdateKey in photosUpdate) {
          if (
            copyPhotosUpdate[copyPhotoUpdateKey]['position'] > photoPosition
          ) {
            copyPhotosUpdate[copyPhotoUpdateKey]['position'] = `${
              parseInt(copyPhotosUpdate[copyPhotoUpdateKey]['position']) - 1
            }`
          }
        }
        copyPhotosUpdate[photo].delete = true

        setPhotosUpdate(copyPhotosUpdate)
      } else {
        const copyInternalPhotosUpdate = { ...internalPhotosUpdate }
        copyInternalPhotosUpdate[photo].delete = true

        setInternalPhotosUpdate(copyInternalPhotosUpdate)
      }

      deleteImageById(photo)
    })

    downButton.addEventListener('click', () =>
      updatePhotoPosition(photo, PHOTO_POSITION.DOWN)
    )

    upButton.addEventListener('click', () =>
      updatePhotoPosition(photo, PHOTO_POSITION.UP)
    )

    deleteButton.innerText = 'X'
    deleteButton.type = 'button'
    deleteButton.className = `photo photo-x ${
      isInternalPhoto ? `photo-internal-${index}` : `photo-${index}`
    }`

    downButton.innerText = '↓'
    downButton.type = 'button'
    downButton.className = `photo photo-x photo-< ${
      isInternalPhoto ? `photo-internal-${index}` : `photo-${index}`
    }`

    upButton.innerText = '↑'
    upButton.type = 'button'
    upButton.className = `photo photo-x photo-> ${
      isInternalPhoto ? `photo-internal-${index}` : `photo-${index}`
    }`

    const image = document.createElement('img')
    image.src = photo
    image.id = photo
    image.className = `photo  photo-x ${
      isInternalPhoto ? `photo-internal-${index}` : `photo-${index}`
    }`
    preview.appendChild(image)
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

          <br />
          <div>
            <br />
            <br />

            <div id="create-listing-photo-intake">
              <p className="">
                <b className="">Multiple Internal Images uploader</b>
              </p>
              <br />
              <br />

              <input
                className="create-listing-photo-intake"
                type="file"
                onChange={({ currentTarget: { files } }) => {
                  setInternalPhotos((prevPhotos) => [...prevPhotos, ...files])
                }}
                value=""
                multiple
              />
            </div>
          </div>
          <div id="preview-existing-internal-photo" />
          <div id="preview-new-internal-photo" />
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
          <div className="create-listing-condition">
            <label for="detailed condition">Detailed Condition: </label>

            <select
              name="detailed-condition"
              id="detailed-condition"
              onChange={({ target: { value } }) =>
                setListing((listing) => ({
                  ...listing,
                  detailedCondition: value
                }))
              }
              value={listing.detailedCondition}
            >
              {Object.keys(CONDITION).map((key) => (
                <option value={key}>{CONDITION[key]}</option>
              ))}
              <option value=""></option>
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

          <div className="create-listing-internal-note">
            <label className="title-label">Internal Note:</label>
            <br />
            <textarea
              className="create-listing-internal-textarea"
              value={listing.internalNote}
              onChange={({ target: { value } }) =>
                setListing((listing) => ({ ...listing, internalNote: value }))
              }
            ></textarea>
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
