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

    return (
      <div className="review-form-wrapper">
        <form onSubmit={this.handleSubmit}>
          <div className="review-input-title">
            Your review: <br/>
            <textarea onChange={this.updateBody.bind(this)} className="review-form-input"  />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }



}

export default ReviewForm;
