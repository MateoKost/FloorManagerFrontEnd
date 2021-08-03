import '../App.css';
import React, { useContext } from 'react';

import AutoSlider from './AutoSlider';

import { Label, FormGroup, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import SignInModal from "../Modals/SignInModal";
import RegisterModal from "../Modals/RegisterModal";

// import NavMenu from '../NavMenu/NavMenu';

import { ModalContext } from "../Modals/ModalContext";

const LandingPage = () => {
  //   constructor(props){
  //     super(props);
  //     this.state = {
  //       signInModal:false,
  //       registerModal:false,

  // //const { signInModal, setSignInModal } = useState(false);
  //     };
  //     this.toggleSignInModal = this.toggleSignInModal.bind(this);
  //     this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
  //   };


  
  // toggleSignInModal(){
  //   this.setState({
  //     signInModal: !this.state.signInModal
  //   })
  // };

  // toggleRegisterModal(){
  //   this.setState({
  //     registerModal: !this.state.registerModal
  //   })
  // };


  return (
      <div>
        <AutoSlider />
        <footer className="gridCenter mt-lg-3">
          <RegisterButton />
        </footer>
        <SignInModal />
        <RegisterModal />
    </div>
  );

}

export default LandingPage;

const RegisterButton = () => {
  const { toggleRegisterModal } = useContext(ModalContext);

  return (
    <Button
      color="dark"
      className="p-4 mt-1"
      onClick={() => {
        toggleRegisterModal();
      }}
    >
      {" "}
      Zarejestruj się{" "}
    </Button>
  );
};