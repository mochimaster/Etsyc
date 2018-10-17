export const asArray = (carts) => {

  // debugger
  let dup_carts = carts;

  if(Object.keys(dup_carts).length === 0){
    return null;
  }

  // debugger
  return  (
    Object.keys(dup_carts).map( key => dup_carts[key])
  );

};

export const selectListingsByAuthor = ({listings}, authorId) => {

  // debugger;
  // const listingsArray = [];


// filter then, map ??

  // return Object.keys(listings).map(key => {
  //   // debugger
  //   if(listings[key].author_id === parseInt(authorId)){
  //     return listings[key];
  //   }
  // });
  if (authorId) {

    let filteredKeys = Object.keys(listings).filter(key =>
      listings[key].author_id === parseInt(authorId) );

    let filteredList = filteredKeys.map(key => listings[key]);

    return filteredList;
  } else {
    return Object.values(listings);
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
