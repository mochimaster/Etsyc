import { CONDITION } from '../../utils/constants'

export const createListing = (listing) => {
  return $.ajax({
    method: 'POST',
    url: '/api/listings',
    data: listing,
    contentType: false,
    processData: false
  })
}

// Became formData - need to use getAll('listing[id]')
export const updateListing = (formData) => {
  // const listingId = formData.getAll('listing[id]') || formData;

  // return $.ajax({
  //   method: 'PATCH',
  //   url: `/api/listings/${formData.getAll('listing[id]')}`,
  //   data: formData,
  //   contentType: false,
  //   processData: false
  // });

  // update through formData
  if (formData.getAll) {
    return $.ajax({
      method: 'PATCH',
      url: `/api/listings/${formData.getAll('listing[id]')}`,
      data: formData,
      contentType: false,
      processData: false
    })
  } else {
    const { id, status } = formData

    return $.ajax({
      method: 'PATCH',
      url: `/api/listings/${id}`,
      data: { listing: { status } }
    })
  }
}

export const getListing = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/listings/${id}`
  })
}

export const getListings = (
  page = 1,
  sort_option = 'newest',
  filters = { condition: CONDITION.ALL }
) => {
  return $.ajax({
    method: 'GET',
    url: `/api/listings?page=${page}`,
    data: { sort: sort_option, filters }
  })
}

export const getSavedListings = (listing_ids) => {
  return $.ajax({
    method: 'GET',
    url: `/api/listings`,
    data: { cart_listing_ids: listing_ids }
  })
}

export const deleteListing = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/listings/${id}`
  })
}

export const listingSearch = (title, page = 1) => {
  return $.ajax({
    method: 'GET',
    url: '/api/search',
    data: {
      search: title,
      page: page
    }
  })
}

export const renewListing = (id) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/listings/${id}/renew`
  })
}

// {entities: {…}, session: {…}, errors: {…}, ui: {…}}
//   entities:
//     users: {id: null}
//     __proto__: Object
//   errors:
//     session: []
//     __proto__: Object
//   session:
//     id: null
//     __proto__: Object
//   ui: {modal: null}
//     __proto__: Object
