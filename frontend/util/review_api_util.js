export const createReview = (review) => {
  return $.ajax({
    method: 'POST',
    url: '/api/reviews',
    data: review
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

export const getReviews = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/reviews/`
  });
};

export const deleteReview = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/reviews/${id}`
  });
};
