import React, { useState } from 'react'

const ReviewForm = (props) => {
  const [body, setBody] = useState('')

  const updateBody = (e) => {
    setBody(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.action({
      body,
      rating: 5,
      listing_id: props.listingId,
      user_id: props.sessionId
    })
    setBody('')
  }

  const reviewButton = props.sessionId ? (
    <button className="btn btn-primary">Submit</button>
  ) : (
    <div>You must be signed in to submit a review.</div>
  )

  return (
    <div className="review-form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="review-input-title">
          Your review: <br />
          <textarea
            onChange={updateBody}
            value={body}
            className="review-form-input"
          ></textarea>
        </div>
        {reviewButton}
      </form>
    </div>
  )
}

export default ReviewForm
