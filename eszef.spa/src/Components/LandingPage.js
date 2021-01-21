import '../App.css';
import React, { Component } from 'react';

import AutoSlider from './AutoSlider';

import { Label, FormGroup, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import SignInModal from "./SignInModal";

import NavMenu from './NavMenu';


class LandingPage extends Component {
    constructor(props){
      super(props);
      this.state = {
        signInModal:false,


  //const { signInModal, setSignInModal } = useState(false);
      };
      this.toggleSignInModal = this.toggleSignInModal.bind(this);
    };


    

  toggleSignInModal(){
    this.setState({
      signInModal: !this.state.signInModal
    })
  };

  render() {
  return (
      <div>
        <NavMenu onClick={this.toggleSignInModal} />
        <AutoSlider />
        <Button color="dark" className="m-4 p-4" onClick={ this.toggleSignInModal } > Zarejestruj się  </Button>
        <SignInModal signInModal={ this.state.signInModal } onCancel={this.toggleSignInModal}/>
{/* {localStorage.getItem.} */}
    </div>
  );
}
}

export default LandingPage;
