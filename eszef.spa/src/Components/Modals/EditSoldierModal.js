import React, { Component } from "react";

import {
  Label,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";



class EditSoldierModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        onEnter: props.onEnter,
        onCancel: props.onCancel,
        editSoldierData: props.editSoldierData,
        editSoldierModal: props.editSoldierModal,
    };
  }

  editSoldier(){
    const { editSoldierData, onEnter } = this.state;
    onEnter( editSoldierData ) ;
  };

  toggleEditSoldierModal(){
    // this.setState({
    //   editItemModal: ! this.state.editItemModal
    // });

    this.state.onCancel(this.state.editSoldierModal);

  };


  componentWillReceiveProps(nextProps) {
    this.setState({
        editSoldierModal: nextProps.editSoldierModal,
        editSoldierData: nextProps.editSoldierData,
    })
  }


  componentDidMount() {}
  
  render() {
    const { editSoldierModal, editSoldierData } = this.state;
    return (
      <Modal isOpen={editSoldierModal} toggle={this.toggleEditSoldierModal.bind(this)} >
          <ModalHeader toggle={this.toggleEditSoldierModal.bind(this)}>Zmień dane żołnierza</ModalHeader>
          <ModalBody>
            <FormGroup>
            
            <FormGroup>
              <Label for="itemName">Stopień</Label>
              <Input type="text" name="itemName" id="itemName" placeholder="Nazwa" value={editSoldierData.rank} />
            </FormGroup>

            <FormGroup>
              <Label for="itemName">Imię</Label>
              <Input type="text" name="itemName" id="itemName" placeholder="Nazwa" value={editSoldierData.name} disabled={true}/>
            </FormGroup>

            <FormGroup>
              <Label for="itemName">Nazwisko</Label>
              <Input type="text" name="itemName" id="itemName" placeholder="Nazwa" value={editSoldierData.lastName} disabled={true}/>
            </FormGroup>

              <Label for="idRoom">Pomieszczenie</Label>
              <Input type="number" name="idRoom" id="idRoom" placeholder="Pomieszczenie"value={editSoldierData.idRoom} onChange={(e) => {
                editSoldierData.idRoom = e.target.value;
                this.setState({ editSoldierData });
              }}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editSoldier.bind(this)}>Zatwierdź</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditSoldierModal.bind(this)}>Anuluj</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

export default EditSoldierModal;
