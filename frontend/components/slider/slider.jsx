import React from 'react'
import Slide from './slide'
import LeftArrow from './left_arrow'
import RightArrow from './right_arrow'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { closeModal } from '../../actions/modal_actions';



class Slider extends React.Component{
    constructor(props){
        super(props)
        this.state = {
                // props from listing_show or app state in modal
                images: props.images || props.listing || props.listing.photoUrls || props.listing.photoUrl,
                currentIndex: 0,
                translateValue: 0,
                modal: Boolean(props.modal)
              }
        this.goNextSlide = this.goNextSlide.bind(this)
        this.goPrevSlide = this.goPrevSlide.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.goToSlide = this.goToSlide.bind(this)
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown);
    }

    goNextSlide(){

        if(this.state.currentIndex === this.state.images.length - 1){
            return this.setState({
                currentIndex: 0,
                translateValue: 0
            })        
        }


        this.setState({
            currentIndex: this.state.currentIndex + 1,
            // translateValue: this.state.translateValue + -(this.slideWidth())
        })
        // this.setState(prevState => ({
        //     currentIndex: prevState.currentIndex + 1
        // }));
    }

    goPrevSlide(){
        if (this.state.currentIndex === 0) {
            return this.setState({
                currentIndex: this.state.images.length-1,
                translateValue: 0
            })
        }
        
        this.setState({
          currentIndex: this.state.currentIndex - 1,
        //   translateValue: this.state.translateValue + this.slideWidth()
        });    
    }

    goToSlide(index){
        this.setState({currentIndex: index})
    }

    slideWidth(){
        return document.querySelector(".slide").clientWidth
    }

    handleKeyDown(event){
        switch (event.code) {
          case 'ArrowRight':
            this.goNextSlide();
            break;
          case 'ArrowLeft':
            this.goPrevSlide();
            break;
        }
    }

    // render(){
    //     console.log("slider.jsx images: ",this.props.images);
    //     console.log("slider.jsx this.state images: ",this.state.images);
    //     return (
    //       <div className="slider">
    //         <LeftArrow goPrevSlide={this.goPrevSlide} />
    //         <RightArrow goNextSlide={this.goNextSlide} />
    //         <div className='slider-wrapper'
    //             style={{
    //                 transform: `translateX(${this.state.translateValue}px)`,
    //                 transition: 'transform ease-out 0.45s'
    //             }}>
    //             {this.state.images.map( (image, index) => {
    //                 return <Slide key={index} image={image} />
    //             })}
    //         </div>
    //       </div>
    //     );
    // }
    render(){

        let additionalClassName = ""
        let modalX = ""
        if (this.state.modal) {
            additionalClassName = "modal-child-photo"
            modalX = <i class="far fa-window-close fa-3x" onClick={this.props.closeModal} />
            ;
        }

        
        if(this.state.images.length <=1){
            return (
              <div><img
                className={`slider-image ${additionalClassName}`}
                src={this.state.images[0]}
                onClick={()=>{this.props.openModal('slider')}}
              />
              {modalX}
              </div>
            );
        }

        // if(this.state.images)
        const sliderThumbnails = <div className="slider-thumbnails-wrapper">
            <div className='slider-thumbnail-inner-wrapper'>
            {this.state.images.map( (image, index) => {
                return (
                    <img
                      className="slider-thumbnails modal-thumbnails"
                      onClick={() => this.goToSlide(index)}
                      onMouseEnter={() => this.goToSlide(index)}
                      src={image}
                    />
                );
                // return <div onClick={() => this.goToSlide(index)} onMouseEnter={() => this.goToSlide(index)} className="slider-thumbnails" style={{background:`url(${image})`}}/> 
            })}
            </div>
        </div>
        
        return (
          <div className="slider">
            <div className="slider-wrapper">
                <LeftArrow goPrevSlide={this.goPrevSlide} />
                <RightArrow goNextSlide={this.goNextSlide} />
              {/* <div
                className="slider-image"
                style={{background: `url(${this.state.images[this.state.currentIndex]})`}}
              /> */}
            <img className={`slider-image ${additionalClassName}`} src={this.state.images[this.state.currentIndex]} onClick={()=>{this.props.openModal('slider')}} />
            {modalX}
            </div>
            {sliderThumbnails}
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      listing:
        ownProps.images ||
        state.entities.listings[parseInt(ownProps.location.pathname.slice(10))]
          .photoUrls ||
            [state.entities.listings[parseInt(ownProps.location.pathname.slice(10))]
                .photoUrl] ||
                [Object.values(state.entities.listings)[0].photoUrl],
      modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return{
        closeModal: () => {
            dispatch(closeModal())
        }
    }
}


// export default Slider;
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider));
