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

import itemIconNames from './IconNames';

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        onEnter: props.onEnter,
        onCancel: props.onCancel,
        editItemData: props.editItemData,
        editItemModal: props.editItemModal,
    };
  }

  editItem(){
    const { editItemData, onEnter } = this.state;
    onEnter(editItemData);
  };

  toggleEditItemModal(){
    // this.setState({
    //   editItemModal: ! this.state.editItemModal
    // });

    this.state.onCancel(this.state.editItemModal);

  };


  componentWillReceiveProps(nextProps) {
    this.setState({
        editItemModal: nextProps.editItemModal,
        editItemData: nextProps.editItemData,
    })
  }


  componentDidMount() {}

  render() {
    const { editItemModal, editItemData } = this.state;
    return (
      <Modal isOpen={editItemModal} toggle={this.toggleEditItemModal.bind(this)} >
          <ModalHeader toggle={this.toggleEditItemModal.bind(this)}>Edytuj przedmiot</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">Identyfikator</Label>
              <Input type="text" name="id" id="id"  value={editItemData.id} disabled={true} />
            </FormGroup>
            <FormGroup>
              <Label for="idRoom">Pomieszczenie</Label>
              <Input type="number" name="idRoom" id="idRoom" placeholder="Pomieszczenie"value={editItemData.idRoom} onChange={(e) => {
                editItemData.idRoom = e.target.value;
                this.setState({ editItemData });
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="itemName">Nazwa</Label>
              <Input type="text" name="itemName" id="itemName" placeholder="Nazwa" value={editItemData.itemName} disabled={true}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editItem.bind(this)}>Zatwierdź</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditItemModal.bind(this)}>Anuluj</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

export default EditModal;
