export const createReview = (review) => {
  return $.ajax({
    method: 'POST',
    url: '/api/reviews',
    data: {review:review}
  });
};

export const updateReview = (review) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/reviews/${review.id}`,
    data: {review: review}
  });
};

export const getReview = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/reviews/${id}`
  });
};

export const getReviews = (listing) => {
  return $.ajax({
    method: 'GET',
    url: `/api/listings/${listing.id}/reviews`
  });
};

export const deleteReview = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/reviews/${id}`
  });
};
