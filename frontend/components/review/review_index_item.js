import React from 'react'

const ReviewIndexItem = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    props.deleteReview(props.review)
  }

  const isAuthor = props.review.user_id === props.sessionId ? true : false
  const deleteButton = isAuthor ? (
    <button onClick={handleSubmit} className="btn btn-primary delete-button">
      Delete
    </button>
  ) : (
    <p></p>
  )

  return (
    <div className="review-index">
      <div className="review-left-side">
        <div className="review-avatar"></div>

        <div>{props.review.username}</div>
      </div>

      <div>
        <li>{props.review.body}</li>
        {deleteButton}
      </div>
    </div>
  )
}

export default ReviewIndexItem
