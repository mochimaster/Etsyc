import React, { useEffect, useState } from 'react'

import ReviewIndexItem from './review_index_item'

const ReviewIndex = (props) => {
  const [reviews] = useState(props.reviews)

  useEffect(() => {
    props.getReviews(props.listing)
  }, [reviews])

  const reviewTag = props.reviews.length ? (
    <p>Reviews</p>
  ) : (
    <p>Reviews - be the first to write a review for this product.</p>
  )

  return (
    <div className="review-container">
      <div className="review-header">{reviewTag}</div>

      <div className="review-body">
        {props.reviews.map((review) => {
          return (
            <ReviewIndexItem
              key={review.id}
              review={review}
              deleteReview={props.deleteReview}
              listing={props.listing}
              sessionId={props.sessionId}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ReviewIndex
