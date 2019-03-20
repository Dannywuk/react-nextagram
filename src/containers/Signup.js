import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, UncontrolledAlert, Alert } from 'reactstrap';
import EmailValidator from 'email-validator';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      signUpMessage: "",
      isError:false,
      errorMessage: "",
      invalidInput: false
    };
  }

  handleUsername=(event)=> {
    
    this.setState({
      username: event.target.value,
      invalidInput: false,
      isError: false
    })
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

  handleSignUp=(event)=>{
    event.preventDefault();
    
    let validUser= this.state.username.length >= 3;
    let validateEmail= EmailValidator.validate(this.state.email)
    let validPassword= this.state.password.length >= 8;
    
    (validUser && validateEmail && validPassword)    
    ? (axios.post ('https://insta.nextacademy.com/api/v1/users/new', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response)
        sessionStorage.setItem('jwt', response.data.auth_token)
        setTimeout(this.props.toggleSignUp,1000);
        this.setState(prevState => ({
          signUpMessage: response.data.message
        }))
        }
      )
      .catch(function (error) {
        console.log(error);
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

    const {signUpModal, toggleSignUp, toggleLogin}=this.props
    const {username, email, password, signUpMessage, isError, errorMessage, invalidInput}=this.state
    const closeBtn = <button className="close" onClick={toggleSignUp}>&times;</button>;

    return (
      
      sessionStorage.getItem('jwt')
      ? <Modal isOpen={signUpModal} toggle={toggleSignUp}>
          <UncontrolledAlert color="success">
            {signUpMessage}
          </UncontrolledAlert> 
        </Modal>
      : (
          <>
        
            <Modal isOpen={signUpModal} toggle={toggleSignUp}>

              <ModalHeader toggle={toggleSignUp} close={closeBtn}>
                Create a new account
              </ModalHeader>

              {isError
              ? <Alert color="danger">{errorMessage}</Alert> 
              : null}

              {invalidInput
              ? <Alert color="danger">Please enter a valid username, email and password.</Alert> 
              : null}

              <ModalBody>

                <Form>
                  <FormGroup>
                    <Label for="userName">
                      Username
                    </Label>
                    <Input type="userName" name="userName" id="userName" placeholder="Username" onChange={this.handleUsername} />
                  </FormGroup>
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
                    <Input type="password" name="password" id="userPassword" placeholder="Password" onChange={this.handlePassword} />
                  </FormGroup>
                  
                </Form>
                <div>
                  <p> 
                    Already a member?
                    <a href="# " onClick={toggleLogin}> Log-in here</a>
                  </p>
                </div>

              </ModalBody>

              <ModalFooter>

                {(username && email && password)
                  ? <Button color="primary" onClick={this.handleSignUp}>Sign up</Button>
                  : <Button color="secondary" disabled>Sign up</Button>
                }
                <Button color="secondary" onClick={toggleSignUp}>Cancel</Button>
              </ModalFooter>

            </Modal>
          </>
        )
    );
  }
}

export default SignUp;