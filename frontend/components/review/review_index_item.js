import React from 'react';
import {Link} from 'react-router-dom';

class ReviewIndexItem extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      review: props.review
    }
  }

  isReviewAuthor(){
    if(this.props.review.user_id === this.props.sessionId){
      return true
    } else {
      return false
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.deleteReview(this.props.review)
  }

  // deleteButton = <button onSubmit={() => this.props.deleteReview(this.props.review.id)}>Delete</button>

  render(){
    let isAuthor = this.isReviewAuthor();
    let deleteButton;

    if (isAuthor){
      deleteButton = <button onClick={this.handleSubmit} className="btn btn-primary delete-button">Delete</button>
    } else {
      deleteButton = <p></p>
    }
    return (
      <div className="review-index">
        <div className="review-left-side">
          <div className="review-avatar">
          </div>

          <div>
            {this.props.review.username}
          </div>
        </div>

        <div>

          <li>{this.props.review.body}</li>
          {deleteButton}
        </div>
      </div>

    );
  }


}

export default ReviewIndexItem;
