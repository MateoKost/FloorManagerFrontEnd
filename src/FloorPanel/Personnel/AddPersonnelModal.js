import React, { useContext } from "react";
import {
  Label,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";

import ranks from "./ranks";

import { PersonnelContext } from "../../REST/Personnel";

const AddModal = () => {
  const { newPersonnelModal, setNewPersonnelModal, clientHandler, ACTIONS } =
    useContext(PersonnelContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, lastName, rank, idRoom } = event.target.elements;
    let params = {
      name: name.value,
      lastName: lastName.value,
      rank: rank.value,
      idRoom: parseInt(idRoom.value),
    };

    clientHandler({ action: ACTIONS.CREATE_PERSONNEL, payload: params });
  };

  return (
    <div>
      <Modal
        isOpen={newPersonnelModal}
        toggle={() => setNewPersonnelModal(false)}
      >
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={() => setNewPersonnelModal(false)}>
            Dodaj nowego pracownika
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="idRoom">Pomieszczenie</Label>
              <Input
                required
                type="number"
                name="idRoom"
                id="idRoom"
                placeholder="Pomieszczenie"
              />
            </FormGroup>

            <FormGroup>
              <Label for="idRoom">Stopień</Label>
              <Input
                type="select"
                name="rank"
                id="rank"
                required
                placeholder="Stopień"
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
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info">Zatwierdź</Button>{" "}
            <Button
              color="secondary"
              onClick={() => setNewPersonnelModal(false)}
            >
              Anuluj
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default AddModal;
