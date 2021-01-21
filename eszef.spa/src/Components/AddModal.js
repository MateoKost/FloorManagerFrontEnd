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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import itemIconNames from './IconNames';

class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        onEnter: props.onEnter,
        newItemModal: props.newItemModal, 
        onCancel: props.onCancel,
        newItemData: {
            id: '',
            idRoom: '',
            itemName: '',
          },
    };
  }

  toggleNewItemModal(){
    this.state.onCancel(this.state.newItemModal);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
        newItemModal: nextProps.newItemModal,
    })
  }

  addItem(){
    const { newItemData, onEnter } = this.state;
    onEnter(newItemData);
  };

  componentDidMount() {

  }

  render() {
    const { newItemModal, newItemData } = this.state;
    return (
        <div>

      <Modal isOpen={ newItemModal } toggle={ this.toggleNewItemModal.bind(this) }>
        <ModalHeader toggle={this.toggleNewItemModal.bind(this)}>
          Dodaj nowe wyposażenie
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="idRoom">Pomieszczenie</Label>
            <Input
              type="number"
              name="idRoom"
              id="idRoom"
              placeholder="Pomieszczenie"
              value={newItemData.idRoom}
              onChange={(e) => {
                newItemData.idRoom = e.target.value;
                this.setState({ newItemData });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="itemName">Nazwa</Label>
            <Input
              required
              type="select"
              name="itemName"
              id="itemName"
              placeholder="Nazwa"
              value={newItemData.itemName}
              onChange={(e) => {
                newItemData.itemName = e.target.value;
                this.setState({ newItemData });
              }}
            >
              {itemIconNames.map((item, i) => (
                <option key={i}>{item.name}</option>
              ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addItem.bind(this)}>
            Zatwierdź
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.toggleNewItemModal.bind(this)}
          >
            Anuluj
          </Button>
        </ModalFooter>
      </Modal>
      </div>
    );
  }
}

export default AddModal;
