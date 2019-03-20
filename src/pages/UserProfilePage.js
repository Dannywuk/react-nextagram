import React from "react"
import axios from 'axios';
import Image from "react-graceful-image";


export default class UserProfilePage extends React.Component {
	constructor(props) {
    super(props);
      this.state = {
	    images:[]
	    // user;[]
	  }
	}
  	
	componentDidMount(){
	  	const {id}=this.props.match.params;
	  		  	
	  	axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
	  	.then(result => {
     
        // If successful, we do stuffs with 'result'
		    this.setState({
		        images: result.data
		    })
		})
		.catch(error => {
	      // If unsuccessful, we notify users what went wrong
	     	console.log('ERROR: ', error)
	    })
	}

	// ==2nd Method==

	// class UserProfilePage extends React.Component{

	// 	render() {
	// 		const userId=this.props.match.params.id;
	// 		const {userDetail}= this.props;
	// 		const user = userDetail.find((user) => (
	//             user.id == userId))
	        
	// 	return (
	// 		<>
	// 			<div className='container-fluid'>
	// 				<div className="row m-3">
	// 					<div className="col-sm-3">
	// 						{user ? 
	// 							<Image src={user.profileImage } className="mb-4" style={{height: 'auto', width: '100%'}}/>
	// 							: null }
	// 					</div>
	// 					<div className="col-6">
	// 						{user ? 
	// 							<h1 style={{textTransform: 'capitalize', fontWeight: 'bold'}}> @{user.username}</h1>
	// 							: null }
	// 					</div>
	// 				</div>
	// 		        <div className="row m-3">
	// 		        		<UserImages userId={userId} height='45vh' width='62vh'/>
	// 		        </div>

	// 		    </div>
			  	
	// 		</>
	// 		)
	// 	}
	//  }

	// ==3rd Method==
	// componentDidMount(){
	// 	Promise.all([
	// 		axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`), 
	// 		axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
	// 	])
	// 	 .then((results) => {
	// 	   this.setState({ 
	// 	     images: results[0].data,
	// 	     user: results[1].data.find((user) => (
    //            user.id === parseInt(this.props.match.params.id)) 
	// 	   });
	// 	});
	// 	   .catch(error => {
	//       // If unsuccessful, we notify users what went wrong
	//      	console.log('ERROR: ', error)
	//     })
	// }

	  
	render() {

		const {images} = this.state
		const {userDetail}= this.props;
		const user = userDetail.find((user) => (
            user.id === parseInt(this.props.match.params.id)))
		
	    return (
		    <div className="container-fluid p-0">

		      <div className="row m-2">
					<div className="col-sm-3 m-2 p-0 text-center">
						{user ? 
							<Image src={user.profileImage }  style={{height: 'auto', width: '80%'}}/>
							: null }
					</div>
					<div className="col-6 mt-3">
						{user ? 
							<h1 style={{textTransform: 'capitalize', fontWeight: 'bold', fontSize:'2rem'}}> @{user.username}</h1>
							: null }
					</div>
			  </div>
		      
		      <div className="row m-2">{
		          images.map((userImage, index) =>(
		            <div className="col-md-4" key={index}>
		              <Image className= "m-2 p-1 img-thumbnail" style={{height:'250px', width:'100%'}} src={userImage} alt= "listOfImages" retry={{ count: 15, delay: 3, accumulate: "add" }}/>
		            </div>
		          ))}
	       	  </div>
	        </div>
	    )
	}
}

