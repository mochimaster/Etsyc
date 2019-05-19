import React from 'react'

// const Slide = ({image}) => {

//     // const styles = {
//     //     backgroundImage: `url(${image})`,
//     //     backgroundSize: 'cover',
//     //     backgroundRepeat: 'no-repeat',
//     //     backgroundPosition: '50% 60%'
//     // }

//     // return(
//     //     <div className="slide" style={styles}>Slide</div>
//     // )

//     return(
//         <img className="slide" src={image} />
//     )
// }

const Slide = ({ key, image }) => {
    console.log("Slide image: ", image)
    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%',
        height: 300
    }
    return <div className="slide" style={styles}></div>
}

export default Slide