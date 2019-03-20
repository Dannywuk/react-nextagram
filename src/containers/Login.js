import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, UncontrolledAlert, Alert } from 'reactstrap';
import EmailValidator from 'email-validator';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogin: false,
      logInMessage: "",
      isError:false,
      errorMessage: "",
      invalidInput: false,
    };
  }

  handleEmail=(event)=> {
    
    this.setState({
      email: event.target.value,
      invalidInput: false,
      isError: false
    });
  }

  handlePassword=(event)=> {

    this.setState({
      password: event.target.value,
      invalidInput: false,
      isError: false
    });
  }

  handleLogin=(event)=> {
    event.preventDefault();
    let validateEmail= EmailValidator.validate(this.state.email)
    let validPassword= this.state.password.length>= 8;
    
    (validateEmail && validPassword)
    ? (axios.post ('https://insta.nextacademy.com/api/v1/login', {    
          email: this.state.email,
          password: this.state.password
      })
      .then(response => {
        console.log(response)
        sessionStorage.setItem('jwt', response.data.auth_token)
        setTimeout(this.props.toggleLogin,1000);
        this.setState ({
          logInMessage: response.data.message
        });
      })
      .catch(error=>{
        console.log(error)
        this.setState ({
          errorMessage: error.response.data.message,
          isError: true
        })
      }))

    : this.setState ({
        invalidInput: true
      })
  }

  render() {

    const {loginModal, toggleLogin, toggleSignUp}=this.props
    const {email, password, logInMessage, isError, errorMessage, invalidInput}= this.state
    const closeBtn = <button className="close" onClick={toggleLogin}>&times;</button>;

    return (

      sessionStorage.getItem('jwt')
      ? <Modal isOpen={loginModal} toggle={toggleLogin}>
          <UncontrolledAlert color="success">
            {logInMessage}
          </UncontrolledAlert> 
        </Modal>
      : (
          <>
            <Modal isOpen={loginModal} toggle={toggleLogin}>

              <ModalHeader toggle={toggleLogin} close={closeBtn}>
                Log-in to your account
              </ModalHeader>

              {isError
              ? <Alert color="danger">{errorMessage}</Alert> 
              : null}

              {invalidInput
              ? <Alert color="danger">Please enter a valid email and password.</Alert> 
              : null}

              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="userEmail">
                      Email
                    </Label>
                    <Input type="email" name="email" id="userEmail" placeholder="Email Address" onChange={this.handleEmail} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="userPassword">
                      Password
                    </Label>
                    <Input type="password" name="password" id="userPasswordPassword" placeholder="Password" onChange={this.handlePassword}/>
                  </FormGroup>
                </Form>
                <div>
                  <p> 
                    New member?
                    <a href="# " onClick={toggleSignUp}> Sign up here</a>
                  </p>
                </div>
              </ModalBody>

              <ModalFooter>
                {(email && password)
                  ? <Button color="primary" onClick={this.handleLogin}>Log In</Button>
                  : <Button color="secondary" disabled>Log In</Button>
                }
                <Button color="secondary" onClick={toggleLogin}>Cancel</Button>
              </ModalFooter>

            </Modal>
          </>
        ) 
    );
  }
}

export default Login;