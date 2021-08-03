import React, { useContext } from "react";

import {
  Label,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,Form
} from "reactstrap";

import { ItemsContext } from "../../REST/Items";

const EditModal = () => {

    const { editItemModal, editItemData, setEditItemData, setEditItemModal , clientHandler, ACTIONS } = useContext(
      ItemsContext
    );

    const handleSubmit = async (event) => {
      event.preventDefault();
      const { id,idRoom, itemName } = event.target.elements;

      let params = {
        itemName: itemName.value,
        idRoom: parseInt(idRoom.value),
      };

      // console.log(idRoom.value);
      // console.log(id.value);

      // clientHandler({action:ACTIONS.UPDATE_ITEM, payload: params })
    
    };
    
    return (
      <Modal
        isOpen={editItemModal}
        toggle={()=>setEditItemModal(false)}
      >
            <Form onSubmit={handleSubmit}> 
        <ModalHeader toggle={()=>setEditItemModal(false)}>
          Edytuj przedmiot
        </ModalHeader>
        <ModalBody>
      
          <FormGroup>
            <Label for="id">Identyfikator</Label>
            <Input
              type="text"
              name="id"
              id="id"
              value={editItemData.id}
              disabled={true}
            />
          </FormGroup>
          <FormGroup>
            <Label for="idRoom">Pomieszczenie</Label>
            <Input
              type="number"
              name="idRoom"
              id="idRoom"
              placeholder="Pomieszczenie"
              value={editItemData.idRoom}
              onChange={(e) => {
                setEditItemData({idRoom:parseInt(e.target.value)});
                // editItemData.idRoom = parseInt(e.target.value);
                // this.setState({ editItemData });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="itemName">Nazwa</Label>
            <Input
              type="text"
              name="itemName"
              id="itemName"
              placeholder="Nazwa"
              value={editItemData.itemName}
              disabled={true}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={handleSubmit}>
            Zatwierdź
          </Button>{" "}
          <Button
            color="secondary"
            onClick={()=>setEditItemModal(false)}
          >
            Anuluj
          </Button>
          
        </ModalFooter>
        </Form>
      </Modal>
    );
  
}

export default EditModal;
// export default EditModal;
