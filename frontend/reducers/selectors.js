import { isEmpty } from 'lodash'

export const asArray = (carts) => {

  if (!carts) {
    return null;
  }

  let dup_carts = carts;

  if (Object.keys(dup_carts).length === 0) {
    return null;
  }

  // debugger
  return (
    Object.keys(dup_carts).map(key => dup_carts[key])
  );

};

export const selectListingsByAuthor = ({ listings }, authorId) => {
  // const listingsArray = [];

  // filter then, map ??

  // return Object.keys(listings).map(key => {
  //   // debugger
  //   if(listings[key].author_id === parseInt(authorId)){
  //     return listings[key];
  //   }
  // });

  if (!isEmpty(listings) && authorId) {

    if (!Array.isArray(listings)) listings = [listings]

    const formattedListings = listings.map(listing => Object.values(listing)[0])

    const matchedAuthorListings = formattedListings.filter(listing => listing.author_id == authorId)

    // let filteredKeys = Object.keys(listings).filter(key =>
    //   listings[key].author_id === parseInt(authorId));

    // let filteredList = filteredKeys.map(key => listings[key]);

    return matchedAuthorListings;
  } else {
    const result = listings.length && listings.map(listing => Object.values(listing)[0])
    return result
    // return Object.values(listings);

  }
  //listingsByAuthor = (9) [{…}, {…}, undefined, undefined, undefined, undefined, undefined, undefined, undefined]



  // map(key => {
  //   // debugger
  //   if(listings[key].author_id === parseInt(authorId)){
  //     return listings[key];
  //   }
  // });
  //

  // let listingsOfAuthor = [];
  // listings.forEach(listing => {
  //   if(listing.author_id === authorId){
  //     listingsOfAuthor.push(listing);
  //   }
  // });
  // return listingsOfAuthor;






  // return listingsArray;
  //
  // listings.map(listing => {
  //   if(listing[authorId]){
  //     listingArray.push(listing[authorId]);
  //   }
  // });
  // debugger;
  //
  // return listingArray;
};
