import '../App.css';
import React from 'react';

import AutoSlider from './AutoSlider';

import { Label, FormGroup, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


const LandingPage= () => {
  return (
      <div>
        <AutoSlider />
        <Button color="dark" className="p-4"> ZALOGUJ SIĘ  </Button>
    </div>
  );
}

export default LandingPage;
