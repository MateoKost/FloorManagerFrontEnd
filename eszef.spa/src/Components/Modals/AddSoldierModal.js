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

import ranks from '../FloorObjects/ranks';


class AddSoldierModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        onEnter: props.onEnter,
        newSoldierModal: props.newSoldierModal, 
        onCancel: props.onCancel,
        newSoldierData: {
          name: "",
          lastName: "",
          rank: "",
          idRoom: "",
          },
    };
  }

  toggleNewSoldierModal(){
    this.state.onCancel(this.state.newSoldierModal);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      newSoldierModal: nextProps.newSoldierModal,
    })
  }

  addSoldier(){
    const { newSoldierData, onEnter } = this.state;
    onEnter(newSoldierData);
  };

  componentDidMount() {

  }

  render() {
    const { newSoldierModal, newSoldierData } = this.state;
    return (
        <div>

      <Modal isOpen={ newSoldierModal } toggle={ this.toggleNewSoldierModal.bind(this) }>
        <ModalHeader toggle={this.toggleNewSoldierModal.bind(this)}>
          Dodaj nowego żołnierza
        </ModalHeader>
        <ModalBody>
         

         
         

  
            <FormGroup>
            <Label for="idRoom">Stopień</Label>
            <Input
              type="select"
              name="rank"
              id="rank"
              required
              placeholder="Stopień"
              value={newSoldierData.rank}
              onChange={(e) => {
                newSoldierData.rank = e.target.value;
                this.setState({ newSoldierData });
              }}
              >
              {ranks.map((rank, i) => (
                <option key={i}>{rank}</option>
              ))}
            </Input>
          </FormGroup>


  
          <FormGroup>
            <Label for="idRoom">Imię</Label>
            <Input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Imię"
              value={newSoldierData.name}
              onChange={(e) => {
                newSoldierData.name = e.target.value;
                this.setState({ newSoldierData });
              }}
            />
          </FormGroup>



          <FormGroup>
            <Label for="idRoom">Nazwisko</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              required
              placeholder="Nazwisko"
              value={newSoldierData.lastName}
              onChange={(e) => {
                newSoldierData.lastName = e.target.value;
                this.setState({ newSoldierData });
              }}
            />
          </FormGroup>



          <FormGroup>
            <Label for="idRoom">Pomieszczenie</Label>
            <Input
              type="number"
              name="idRoom"
              id="idRoom"
              required
              placeholder="Pomieszczenie"
              value={newSoldierData.idRoom}
              onChange={(e) => {
                newSoldierData.idRoom = e.target.value;
                this.setState({ newSoldierData });
              }}
            />
          </FormGroup>
          
       
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addSoldier.bind(this)}>
            Zatwierdź
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.toggleNewSoldierModal.bind(this)}
          >
            Anuluj
          </Button>
        </ModalFooter>
      </Modal>
      </div>
    );
  }
}

export default AddSoldierModal;
