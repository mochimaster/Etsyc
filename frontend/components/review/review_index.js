import React from 'react';
import ReviewIndexItem from './review_index_item';

class ReviewIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      reviews: props.reviews ? props.reviews : ""
    };
  }

  componentDidMount(){
    this.props.getReviews(this.props.listing).then(() => {
      this.setState({
        reviews: this.props.reviews
      });
    });
  }

  render(){
    if(!this.props.reviews){
      return null;
    }

    let reviewTag ;
    if(this.props.reviews.length <= 0){
      reviewTag = (<p>Reviews - be the first to write a review for this product.</p>);

    }else {
      reviewTag = (<p>Reviews</p>);
    }

    return (
      <div className="review-container">
        <div className="review-header">
          {reviewTag}
        </div>


          <div className="review-body">
            {this.props.reviews.map( review => {
              return (<ReviewIndexItem review={review}/>)
            })}
          </div>


      </div>
    );
  }
}

export default ReviewIndex;