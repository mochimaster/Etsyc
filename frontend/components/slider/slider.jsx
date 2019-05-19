import React from 'react'
import Slide from './slide'
import LeftArrow from './left_arrow'
import RightArrow from './right_arrow'

class Slider extends React.Component{
    constructor(props){
        super(props)
        this.state = {
                images: props.images,
                currentIndex: 0,
                translateValue: 0
              }
        this.goNextSlide = this.goNextSlide.bind(this)
        this.goPrevSlide = this.goPrevSlide.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
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
        });    }

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
        if(this.state.images.length <=1){
            return (
              <img
                className="slider-image"
                src={this.state.images[0]}
              />
            );
        }

        return (
          <div className="slider">
                <LeftArrow 
                goPrevSlide={this.goPrevSlide} />
                <RightArrow 
                goNextSlide={this.goNextSlide} />
            <div className='slider-wrapper'
                
            >
                <img className='slider-image' src={this.state.images[this.state.currentIndex]} />
            </div>
          </div>
        );
    }
}


export default Slider;