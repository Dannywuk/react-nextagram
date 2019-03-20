import React from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Image from "react-graceful-image";
import loadingImage from '../image/loading2.gif';

class UserImages extends React.Component{
   constructor(props) {
      super(props);
        this.state = {
          images: [],
          isLoading: true,
    }
  }

  componentDidMount() {
    const {userId} = this.props;
  // performing a GET request to '/api-end-point'
    axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
    .then(result => {
     
      // If successful, we do stuffs with 'result'
      this.setState({
        images:result.data,
        isLoading:false
      })
    })
    .catch(error => {
      // If unsuccessful, we notify users what went wrong
      console.log('ERROR: ', error)
    })
  }

  render() {

    const {images, isLoading} = this.state


    return (

      isLoading
      ? <Loader image={loadingImage}/>
      : (
        <>
          <div>{
            images.map((userImage, index) =>(
              <div key={index} className="d-inline">
                <Image className= "m-2 p-1 img-thumbnail" style={{height:this.props.height, width: this.props.width}} src={userImage} alt= "listOfImages" retry={{ count: 15, delay: 3, accumulate: "add" }}/>
              </div>
            ))}
          </div>
        </>    
        )
    )
  }
}

export default UserImages