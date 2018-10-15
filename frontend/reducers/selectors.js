export const selectListingsByAuthor = ({listings}, authorId) => {
  // does it return array ??

  // iterate through
  //

  // debugger;
  // const listingsArray = [];


// filter then, map ??
  return Object.keys(listings).map(key => {
    // debugger
    if(listings[key].author_id === parseInt(authorId)){
      return listings[key];
    } else {

    }
  });

  //listingsByAuthor = (9) [{…}, {…}, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

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
