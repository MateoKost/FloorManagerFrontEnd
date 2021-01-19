
import React, { Component } from 'react';


import { Label, FormGroup, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faPen, faLightBulb,  faChair,  faFireExtinguisher,  faTshirt,  faMugHot,  faInbox,  faBed,  
    faBookOpen,  faBook,  faMedkit,  faFileAlt,  faKey,  faServer,  faBroom,  faBrush,  faLightbulb
  } from '@fortawesome/free-solid-svg-icons'

import AutoSlider from './AutoSlider';
import FloorGrid from './FloorGrid';
  
import { Alert } from 'reactstrap';

import  axios  from 'axios';

import '../App.css';

class FloorManager extends Component {
    constructor(props){
      super(props);
      this.state = {
       
        items: [],

        selectedRoomData: {
          roomItems: [],
          roomSoldiers: [],
          roomId: '',
        },
  
        selectedRoomId:'',

        newItemData: {
          id: '',
          idRoom: '',
          itemName: '',
        },
        editItemData: {
          id: '',
          idRoom: '',
          itemName: '',
        },
        addedData: {
          id: '',
          idRoom: '',
          itemName: '',
        },
        addedItem: false,
        deletedItem: false,
        newItemModal: false,
        editItemModal: false,
        alertVisibility: true,
        alertVisibilityDeleted: true,
        itemNames:[
          { name:"Lampka",   faIcon: <FontAwesomeIcon icon={faLightbulb} />},
          { name:"Krzesło", faIcon:<FontAwesomeIcon icon={faChair} />},
          { name:"Gaśnica", faIcon:<FontAwesomeIcon icon={faFireExtinguisher} />},
          { name:"Szafa", faIcon:<FontAwesomeIcon icon={faTshirt} />},
          { name:"Czajnik", faIcon:<FontAwesomeIcon icon={faMugHot} />},
          { name:"Komoda", faIcon:<FontAwesomeIcon icon={faInbox} />},
          { name:"Łóżko", faIcon:<FontAwesomeIcon icon={faBed} />},
          { name:"Biurko", faIcon:<FontAwesomeIcon icon={faBookOpen} />},
          { name:"Regał", faIcon:<FontAwesomeIcon icon={faBook} />},
          { name:"Apteczka", faIcon:<FontAwesomeIcon icon={faMedkit} />},
          { name:"Dokumentacja", faIcon:<FontAwesomeIcon icon={faFileAlt} />},
          { name:"Szafka z kluczami", faIcon:<FontAwesomeIcon icon={faKey} />},
          { name:"Serwer", faIcon:<FontAwesomeIcon icon={faServer} />},
          { name:"Miotła", faIcon:<FontAwesomeIcon icon={faBroom} />},
          { name:"Szczotka", faIcon:<FontAwesomeIcon icon={faBrush} />},
          { name:"Śmietnik", faIcon:<FontAwesomeIcon icon={faTrash} />},
        ],
      };
    }
  
    componentDidMount(){
       this.getItems();
    }
  
  getItems = async() => {
    await axios.get("https://localhost:5001/item").then(response => {  
                this.setState({  
                items: response.data 
              });  
          });  
  }
  
  getRoomItems = async(roomId) => {
    // const { roomItems, selectedRoomId } = this.state;
    await axios.get("https://localhost:5001/room/"+parseInt(roomId) ).then(response => {  
    //   console.log(response.data)  
                this.setState({  
                  selectedRoomData: {
                    roomItems: response.data.items,
                    roomSoldiers: response.data.soldiers,
                    roomId: roomId,
                  }
                  
              });  
          });  
  }
  
  toggleNewItemModal(){
    this.setState({
      newItemModal: ! this.state.newItemModal
    });
  };
  
  setEditItemData(id, idRoom, itemName){
    this.toggleEditItemModal();
    this.setState({
      editItemData: {
          id: id,
          idRoom: idRoom,
          itemName: itemName,
        }
    });
  };
  
  toggleEditItemModal(){
    this.setState({
      editItemModal: ! this.state.editItemModal
    });
  };
  
  addItem = async () => {
    const { newItemData, items } = this.state;
    let params2 = {
      "itemName": newItemData.itemName,  
      "idRoom": parseInt(newItemData.idRoom)
    };
  
  
    axios.post('https://localhost:5001/item', params2 ).then( _ => {
      this.getItems()
      this.setState({ 
            newItemModal: false,  
            items, 
            newItemData: {
              id: '',
              idRoom: '',
              itemName: '',
            },
            addedData:{
              id: '',
              idRoom: newItemData.idRoom,
              itemName: newItemData.itemName,
            },
            alertVisibility: true,
            addedItem: true,
          });
    });
  
  };
  
  
  editItem = async () =>{
    const { editItemData, items } = this.state;
    await fetch(`http://localhost:1234/items/edit?id=${editItemData.id}&idRoom=${editItemData.idRoom}&itemName=${editItemData.itemName}`, {
    }).then(response=>{
      console.log(response.data)
      this.getItems();
      this.setState({      
        editItemModal: false,  
        items, 
        editItemData: {
          id: '',
          idRoom: '',
          itemName: '',
        },
        
      });
    });
  };
  
  deleteItem = async ({id}) =>{
    const { items } = this.state;
    await axios.delete(`https://localhost:5001/item/${id}`).then( _ => {
      const dataById = items.find( item => item.id === id );
      this.setState({      
          addedData:dataById,
          deletedItem: true,
          alertVisibilityDeleted: true,
        });
      this.getItems();
        });
    };
  
    onDismiss = () => this.setState({ alertVisibility:false });
    onDismissDeleted = () => this.setState({ alertVisibilityDeleted:false });
  
  
  renderRow = ({ id, idRoom, itemName }) => 
    <tr key={ id }>
      <td>{id}</td>
      <td>{idRoom}</td>
      <td>{itemName}</td>
      <td>{ this.state.itemNames.find(item =>  item.name === itemName ) ? this.state.itemNames.find(item =>  item.name === itemName ).faIcon : <FontAwesomeIcon icon={faChair} /> }</td>
     
      <td>
        <Button color="success" size="sm" className="mr-2" onClick={this.setEditItemData.bind(this, id, idRoom, itemName)}>
          <FontAwesomeIcon icon={faPen} /></Button>
        <Button color="danger" size="sm" onClick={this.deleteItem.bind(this, {id})}>
          <FontAwesomeIcon icon={faTrash} /></Button>
      </td>
    </tr>
  

  renderSoldier = ({ idSoldier, name, lastName, rank, idRoom }) => 
  <tr key={ idSoldier }>
    <td>{rank}</td>
    <td>{name}</td>
    <td>{lastName}</td>
    <td>{idRoom }</td>
      
    <td>
      <Button color="success" size="sm" className="mr-2" onClick={this.setEditItemData.bind(this, idSoldier, name, lastName, rank, idRoom)}>
        <FontAwesomeIcon icon={faPen} /></Button>
      <Button color="danger" size="sm" onClick={this.deleteItem.bind(this, {idSoldier})}>
        <FontAwesomeIcon icon={faTrash} /></Button>
    </td>
  </tr>
 

  selectRoom = ( roomId ) => {
    // console.log(roomId);
    this.setState({
        selectedRoomId: roomId
    });
    this.getRoomItems(roomId);
  };


    render() {
      const { items, newItemModal, newItemData,  addedData, editItemData, editItemModal, addedItem, alertVisibility, itemNames, deletedItem, alertVisibilityDeleted, 
        selectedRoomData, selectedRoomId
       } = this.state;
    return (
      <div>
          <div class="row">
          <div className="col-lg-6"> <FloorGrid  
          selectRoom={this.selectRoom}
          // dedeFG={(e) => {
          //   // newItemData.idRoom = e.target.value;
          //   // this.setState({ newItemData });
          //   //console.log(e);
          // }
         // }
          // onClick={this.toggleSelectRoom}
          /></div>
          <div className="col-lg-6"> 

        { addedItem &&  <Alert color="success" isOpen={alertVisibility} toggle={this.onDismiss}>
          Dodano <b>{addedData.itemName}</b> do pokoju nr <b>{addedData.idRoom}</b>.
        </Alert> 
        }
  
        { deletedItem &&  <Alert color="warning" isOpen={alertVisibilityDeleted} toggle={this.onDismissDeleted}>
          Usunięto <b>{addedData.itemName}</b> z pokoju nr <b>{addedData.idRoom}</b>.
        </Alert> 
        }
      

        <Button color="primary" onClick={this.toggleNewItemModal.bind(this)}><FontAwesomeIcon icon={faPlus} /> Dodaj nowe wyposażenie</Button>
        <Modal isOpen={newItemModal} toggle={this.toggleNewItemModal.bind(this)} >
          <ModalHeader toggle={this.toggleNewItemModal.bind(this)}>Dodaj nowe wyposażenie</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="idRoom">Pomieszczenie</Label>
              <Input type="number" name="idRoom" id="idRoom" placeholder="Pomieszczenie"value={newItemData.idRoom} onChange={(e) => {
                newItemData.idRoom = e.target.value;
                this.setState({ newItemData });
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="itemName">Nazwa</Label>
              <Input required type="select" name="itemName" id="itemName" placeholder="Nazwa" value={newItemData.itemName} onChange={(e) => {
                newItemData.itemName = e.target.value;
                this.setState({ newItemData });
              }}>
                   { itemNames.map(  (item,i) => <option key={i}>{item.name}</option>  ) }
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addItem.bind(this)}>Zatwierdź</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewItemModal.bind(this)}>Anuluj</Button>
          </ModalFooter>
        </Modal>
  
        <Modal isOpen={editItemModal} toggle={this.toggleEditItemModal.bind(this)} >
          <ModalHeader toggle={this.toggleEditItemModal.bind(this)}>Edytuj przedmiot</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">Identyfikator</Label>
              <Input type="text" name="id" id="id"  value={editItemData.id} onChange={(e) => {
                editItemData.id = e.target.value;
                this.setState({ editItemData });
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="idRoom">Pomieszczenie</Label>
              <Input type="number" name="idRoom" id="idRoom" placeholder="Pomieszczenie"value={editItemData.idRoom} onChange={(e) => {
                editItemData.idRoom = e.target.value;
                this.setState({ editItemData });
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="category">Kategoria</Label>
              <Input type="select" name="category" id="category">
                <option>1</option>
  
              </Input>
            </FormGroup>              
            <FormGroup>
              <Label for="itemName">Nazwa</Label>
              <Input type="text" name="itemName" id="itemName" placeholder="Nazwa" value={editItemData.itemName} onChange={(e) => {
                editItemData.itemName = e.target.value;
                this.setState({ editItemData });
              }}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editItem.bind(this)}>Zatwierdź</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditItemModal.bind(this)}>Anuluj</Button>
          </ModalFooter>
        </Modal>
  
        <h1> { selectedRoomId }  </h1>
        

        <Table>
          <thead>
            <tr>
             <th>Stopień</th> <th>Imię</th> <th>Nazwisko</th> <th>Pokój</th> <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
              { selectedRoomData.roomSoldiers.map(this.renderSoldier) }
          </tbody>
        </Table>

        <Table>
          <thead>
            <tr>
              <th>#</th> <th>Pomieszczenie</th> <th>Nazwa</th> <th>Ikona</th> <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
              { selectedRoomData.roomItems.map(this.renderRow) }
          </tbody>
        </Table>


        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Pomieszczenie</th>
              <th>Nazwa</th>
              <th>Ikona</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>

              

              { items.map(this.renderRow) }
          </tbody>
        </Table>

        </div>
        </div>
      </div>
    );
  }
  }
  
  export default FloorManager;
  