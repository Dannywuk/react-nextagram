import React from 'react';
import { Link } from "react-router-dom";
import Logo from "./images/logo.png";
import Login from "./Login"
import Signup from "./Signup"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Modal,
  UncontrolledAlert} from 'reactstrap';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      loginModal: false,
      signUpModal: false,
      logoutModal: false
    };
  }

  toggle=()=> {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleLogin=()=> {
    this.setState(prevState => ({
      loginModal: !prevState.loginModal,
      signUpModal: false
    }));
  }

  toggleSignUp=()=> {
    this.setState(prevState => ({
      signUpModal: !prevState.signUpModal,
      loginModal: false
    }));
  }

  toggleLogout=()=> {
    this.setState(prevState => ({
      logoutModal: !prevState.logoutModal
    }));
  }

  handleLogout=()=> {
    sessionStorage.removeItem('jwt')
    this.forceUpdate()
    this.setState(prevState => ({
      logoutModal: !prevState.logoutModal
    }));
  }

  render() {

    const {isOpen, loginModal, signUpModal, logoutModal}= this.state

    const navItemStyle= {
      textDecoration: 'none',
      marginLeft: "0.5rem",
      marginRight: "0.5rem",
      fontSize: "1.5rem",
      color: "#313030",
      padding: "0",
      fontFamily: 'Lobster'
    }

    return (
      <>
        {logoutModal
        ? <Modal isOpen={logoutModal} onClick={this.toggleLogout}>
            <UncontrolledAlert color="success">
              You have been successfully logged out!
            </UncontrolledAlert> 
          </Modal>
        : null}

        <Navbar color="light" light expand="md">

          <NavbarBrand href="/" style= {{fontFamily:'Henny Penny', fontSize:'1.6rem'}}>
            <img src={Logo} style= {{ height: "6vh", width:"6vh", verticalAlign: "middle" }} className="mx-1" alt="Logo"/>
            Nextagram
          </NavbarBrand>

          <NavbarToggler onClick={this.toggle} />

          <Collapse isOpen={isOpen} navbar>

            <Nav className="ml-auto" navbar>

              {/*<NavItem className="m-auto">
                <form className="form-inline mx-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
              </NavItem>*/}

              <NavItem className="m-auto">
                <Link to="/" style={ navItemStyle } id="Home">
                  Home
                </Link> 
              </NavItem>

              { sessionStorage.getItem('jwt')

              ? <>
                  <NavItem className="m-auto">
                    <Link to="/profile" style={ navItemStyle } id="MyProfile">
                      My Profile
                    </Link> 
                  </NavItem>

                  <NavItem className="m-auto">
                    <Link to="/" style={ navItemStyle } id="LogOut">
                      <Button color="primary" onClick={this.handleLogout}>Log Out</Button>
                    </Link> 
                  </NavItem>
                </>

              : <NavItem className="m-auto">
                  <Link to="/" style={ navItemStyle } id="LogIn">
                    <Button color="primary" onClick={this.toggleLogin}>Log In</Button>
                  </Link> 
                </NavItem>
              }
              
              <Login loginModal={loginModal} toggleLogin={this.toggleLogin} toggleSignUp={this.toggleSignUp} />
              <Signup signUpModal={signUpModal} toggleSignUp={this.toggleSignUp} toggleLogin={this.toggleLogin} />

            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}  