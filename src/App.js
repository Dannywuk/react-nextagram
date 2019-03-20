import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom"
import './App.css';
import axios from 'axios';
import Homepage from './pages/Homepage';
import UserProfilePage from './pages/UserProfilePage';
import MyProfilePage from './pages/MyProfilePage.js';
import Navbar from './containers/NavBar';
import Loader from './components/Loader';
import loadingImage from './image/loading3.gif';


class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        users: [],
        isLoading: true,
  }
}

  componentDidMount() {
  // performing a GET request to '/api-end-point'
    axios.get('https://insta.nextacademy.com/api/v1/users/')
    .then(result => {
     
      // If successful, we do stuffs with 'result'
      this.setState({
        users: result.data,
        isLoading:false
      })
    })
    .catch(error => {
      // If unsuccessful, we notify users what went wrong
      console.log('ERROR: ', error)
    })    
  }

  render(){
    const {users, isLoading}=this.state  

    return (

      isLoading
      ? <Loader height = '100%' width= '100%' image={loadingImage}/>
      : (
        <>
          <Navbar />

          <Switch>
            <Route exact 
              path="/" 
              render= {(props)=> <Homepage {...props} userDetail={users} />} />
            <Route exact
              path="/profile" 
              render={(props)=> <MyProfilePage {...props} userDetail={users} />} />  
            <Route 
              path="/users/:id" 
              render={(props)=> <UserProfilePage {...props} userDetail={users} />} />  
          </Switch>
        </>
        ) 
    )
  }
}

export default App;
