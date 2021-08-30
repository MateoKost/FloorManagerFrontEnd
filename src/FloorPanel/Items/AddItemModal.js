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
import itemIconNames from "../../Utilities/IconNames";

import { ItemsContext } from "../../REST/Items";

const AddModal = () => {
  const { newItemModal, setNewItemModal, clientHandler, ACTIONS } =
    useContext(ItemsContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { itemName, idRoom } = event.target.elements;
    let params = {
      itemName: itemName.value,
      idRoom: parseInt(idRoom.value),
    };

    clientHandler({ action: ACTIONS.CREATE_ITEM, payload: params });
  };

  return (
    <div>
      <Modal isOpen={newItemModal} toggle={() => setNewItemModal(false)}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={() => setNewItemModal(false)}>
            Dodaj nowe wyposażenie
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
              <Label for="itemName">Nazwa</Label>
              <Input
                required
                type="select"
                name="itemName"
                id="itemName"
                placeholder="Nazwa"
              >
                {itemIconNames.map((item, i) => (
                  <option key={i}>{item.name}</option>
                ))}
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info">Zatwierdź</Button>{" "}
            <Button color="secondary" onClick={() => setNewItemModal(false)}>
              Anuluj
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default AddModal;
