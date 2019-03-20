import React from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Image from "react-graceful-image";
import loadingImage from '../image/loading2.gif';
import { Redirect } from 'react-router-dom'


export default class MyProfilePage extends React.Component {
    state = {
        myImages : [],
        isLoading :true
    }
    componentDidMount() {
        
	    axios({
        method: 'get',
		    url: 'https://insta.nextacademy.com/api/v1/images/me',
		    headers: {
		      Authorization: `Bearer ${sessionStorage.jwt}`
	      },
		})
	    .then(response => {
	        
	        console.log(response)
	        this.setState({
	        	myImages: response.data,
	        	isLoading: false
	        })
	    })
	    .catch(error => {
	        
	        console.log('ERROR: ', error)
	    })  
    }

    render() {

    	if (!sessionStorage.getItem('jwt')) {
            alert("You need to login to view this content. Please Login.")
            return <Redirect to="/" />
        }

   		const {myImages, isLoading} = this.state

    return (

      isLoading
      ? <Loader image={loadingImage}/>
      : (
        <>
          <div>{
            myImages.map((userImage, index) =>(
              <div key={index} className="d-inline">
                <Image className= "m-2 p-1 img-thumbnail" style={{height: '40vh', width: '47vh'}} src={userImage} alt= "listOfImages" retry={{ count: 15, delay: 3, accumulate: "add" }}/>
              </div>
            ))}
          </div>
        </>    
        )
    )
  }
}