import React from 'react';

class ReviewForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      body: "",
      listing_id: props.listingId,
      rating: 5,
      user_id: props.sessionId
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    if(this.props.formType === 'Create Review'){

    } else {
      this.props.getReview(this.props.match.params.listingId);
    }
  }

  updateBody(e){
    this.setState({body: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state);
  }

  render(){

    let reviewButton;
    if (this.props.sessionId){
      reviewButton = <button className="btn btn-primary">Submit</button>
    } else {
      reviewButton = <div>You must be signed in to submit a review.</div>
    }

    return <div className="review-form-wrapper">
        <form onSubmit={this.handleSubmit}>
          <div className="review-input-title">
            Your review: <br />
            <textarea onChange={this.updateBody.bind(this)} className="review-form-input" />
          </div>
          {reviewButton}
        </form>
      </div>;
  }



}

export default ReviewForm;
