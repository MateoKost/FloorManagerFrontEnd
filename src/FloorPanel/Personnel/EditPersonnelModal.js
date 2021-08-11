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

const EditPersonnelModal = () => {
  const {
    editPersonnelModal,
    editPersonnelData,
    setEditPersonnelData,
    setEditPersonnelModal,
    clientHandler,
    ACTIONS,
  } = useContext(PersonnelContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { lastName, rank, idRoom } = event.target.elements;
    let params = {
      lastName: lastName.value,
      rank: rank.value,
      idRoom: parseInt(idRoom.value),
    };

    clientHandler({ action: ACTIONS.UPDATE_PERSONNEL, payload: params });
  };

  return (
    <div>
      <Modal
        isOpen={editPersonnelModal}
        toggle={() => setEditPersonnelModal(false)}
      >
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={() => setEditPersonnelModal(false)}>
            Edytuj pracownika
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <FormGroup>
                <Label for="idRoom">Stopień</Label>
                <Input
                  type="select"
                  name="rank"
                  id="rank"
                  required
                  placeholder="Stopień"
                  value={editPersonnelData.rank}
                  onChange={(e) => {
                    setEditPersonnelData({ rank: e.target.value });
                  }}
                >
                  {ranks.map((rank, i) => (
                    <option key={i}>{rank}</option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="name">Imię</Label>
                <Input
                  required
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Imię"
                  value={editPersonnelData.name}
                  disabled={true}
                />
              </FormGroup>

              <FormGroup>
                <Label for="lastName">Nazwisko</Label>
                <Input
                  required
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Nazwisko"
                  value={editPersonnelData.lastName}
                  disabled={true}
                />
              </FormGroup>

              <Label for="idRoom">Pomieszczenie</Label>
              <Input
                required
                type="number"
                name="idRoom"
                id="idRoom"
                placeholder="Pomieszczenie"
                value={editPersonnelData.idRoom}
                onChange={(e) => {
                  setEditPersonnelData({ idRoom: e.target.value });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info">Zatwierdź</Button>{" "}
            <Button
              color="secondary"
              onClick={() => setEditPersonnelModal(false)}
            >
              Anuluj
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default EditPersonnelModal;
