import React from 'react';
import UserImages from '../containers/UserImages.js';
import Image from "react-graceful-image";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';


const Homepage =(props)=> {

	return (
		<div>
			<div className="container-fluid p-0">
                <div> {
		    		(props.userDetail).map(user =>
			          <div key={user.id} className='row my-4 bg-light'>
			          	
		          		<div className="col-md-3 text-center p-1 pb-3">

				          <p className="m-3" style={{textTransform: 'capitalize', fontWeight: 'bold', fontSize: '1.5rem'}}>{user.username}</p>
				          <Image className="userImage" src={user.profileImage} alt="profileImage" retry={{ count: 15, delay: 3, accumulate: "add" }}/>

				          
				          <Link to={`/users/${user.id}`}>
					          <Button color="primary" className="m-auto d-block">See More</Button>
					      </Link>

				        </div>


						<div className="col-md-9 p-2 text-center">

				        	<UserImages userId={user.id} height = '40vh' width = '47vh'/>

		          		</div>

			          </div>
		  		)}
			    </div>
			</div>
		</div>
		)
 }

  

export default Homepage
