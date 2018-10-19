import React from 'react';
import {Link} from 'react-router-dom';

class ReviewIndexItem extends React.Component {
  constructor(props){
    super(props);
  }


  render(){

    return (

      <div className="review-index">
        <div className="review-left-side">
          <div className="review-avatar">
          </div>

          <div>
            {this.props.review.username}
          </div>

        </div>


          <li>{this.props.review.body}</li>

      </div>

    );
  }


}

export default ReviewIndexItem;
