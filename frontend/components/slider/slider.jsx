import React from 'react'

class Slider extends React.Component{
    constructor(props){
        super(props)
        this.state = {
                images: props.images
              }
    }

    render(){
        console.log(this.props.images);
        return(
            <div>
                'Slider component'
                
            </div>
        )
    }
}

export default Slider;