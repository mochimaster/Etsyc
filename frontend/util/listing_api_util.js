export const createListing = (listing) => {
  return $.ajax({
    method: 'POST',
    url: '/api/listings',
    data: listing,
    contentType: false,
    processData: false
  });
};

// Became formData - need to use getAll('listing[id]')
export const updateListing = (formData) => {
  let listingId = formData.getAll('listing[id]');

  return $.ajax({
    method: 'PATCH',
    url: `/api/listings/${formData.getAll('listing[id]')}`,
    data: formData,
    contentType: false,
    processData: false
  });
};

export const getListing = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/listings/${id}`
  });
};

export const getListings = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/listings/`,
  });
};

export const getSavedListings = (listing_ids) => {
  return $.ajax({
    method: 'GET',
    url: `/api/listings`,
    data: {cart_listing_ids: listing_ids}
  });
};

export const deleteListing = (id) => {

  return $.ajax({
    method: 'DELETE',
    url: `/api/listings/${id}`
  });
};

export const listingSearch = (title) => {
  // debugger
  return $.ajax({
    method: 'GET',
    url: '/api/search',
    // data: {search: title}
    data: {search: title}
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
