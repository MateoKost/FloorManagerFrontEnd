import logo from './logo.svg';
import './App.css';

import { Label, FormGroup, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import FloorGrid from './Components//FloorGrid';
import NavMenu from './Components/NavMenu';

// import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from 'react';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      newItemData: {
        idItem: '',
        idRoom: '',
        itemName: '',
      },
      editItemData: {
        idItem: '',
        idRoom: '',
        itemName: '',
      },
      newItemModal: false,
      editItemModal: false,
    };
  }

  componentDidMount(){
    // axios.get('http://localhost:3000/items').then((response) => {
    //   this.setState({ 
    //     items: response 
    //   })
    // });

   this.getItems();


  }

getItems = async () => {
  await fetch('http://localhost:1234/items',{method: 'GET', mode: 'cors', credentials: 'omit'})
  .then(response => {return response.json();})
  // .then(response => {return JSON.stringify(response);})
  .then(response => {console.log('BEFORE',response); {return response.data}})
  .then(response => {this.setState({ items: response })})
  .catch(err => console.error(err))
}


toggleNewItemModal(){
  this.setState({
    newItemModal: ! this.state.newItemModal
  });
};

setEditItemData(idItem, idRoom, itemName){
  this.toggleEditItemModal();
  this.setState({
    editItemData: {
        idItem: idItem,
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
  await fetch(`http://localhost:1234/items/add?idItem=${newItemData.idItem}&idRoom=${newItemData.idRoom}&itemName=${newItemData.itemName}`, {
    //method: 'POST', mode: 'cors', credentials: 'omit', body: JSON.stringify(this.state.newItemData)
  }).then( _ => {
    this.getItems();
    //console.log(response.data)
    //const { items } = this.state;
    //items.push(response.data);
    this.setState({ 
      
      newItemModal: false,  
      items, 
      newItemData: {
        idItem: '',
        idRoom: '',
        itemName: '',
      }
    });
  });
};

editItem = async () =>{
  const { editItemData, items } = this.state;
  await fetch(`http://localhost:1234/items/edit?idItem=${editItemData.idItem}&idRoom=${editItemData.idRoom}&itemName=${editItemData.itemName}`, {
    //method: 'POST', mode: 'cors', credentials: 'omit', body: JSON.stringify(this.state.newItemData)
  }).then(response=>{
    console.log(response.data)
    this.getItems();
    this.setState({      
      editItemModal: false,  
      items, 
      editItemData: {
        idItem: '',
        idRoom: '',
        itemName: '',
      }
    });
  });
};

deleteItem = async ({idItem}) =>{
  const { items } = this.state;
  await fetch(`http://localhost:1234/items/delete?idItem=${idItem}`, {
    //method: 'POST', mode: 'cors', credentials: 'omit', body: JSON.stringify(this.state.newItemData)
  }).then(response=>{
    this.getItems();
    console.log(response.data)
    this.setState({ 
      items
    });
  });
};


renderRow = ({ idItem, idRoom, itemName }) => 
  <tr key={ idItem }>
    <td>{idItem}</td>
    <td>{idRoom}</td>
    <td>{itemName}</td>
    <td>
      <Button color="success" size="sm" className="mr-2" onClick={this.setEditItemData.bind(this, idItem, idRoom, itemName)}>Edit</Button>
      <Button color="danger" size="sm" onClick={this.deleteItem.bind(this, {idItem})}>Delete</Button>
    </td>
  </tr>

  render() {
    const { items, newItemModal, newItemData, editItemData, editItemModal } = this.state;
  return (
    <div className="App conta">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <NavMenu />
  

      <Button color="primary" onClick={this.toggleNewItemModal.bind(this)}>Add a new item</Button>
      <Modal isOpen={newItemModal} toggle={this.toggleNewItemModal.bind(this)} >
        <ModalHeader toggle={this.toggleNewItemModal.bind(this)}>Add a new item</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="idItem">Identyfikator</Label>
            <Input required type="text" name="idItem" id="idItem" placeholder="Identyfikator" value={newItemData.idItem} onChange={(e) => {
              newItemData.idItem = e.target.value;
              this.setState({ newItemData });
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="idRoom">Pomieszczenie</Label>
            <Input type="number" name="idRoom" id="idRoom" placeholder="Pomieszczenie"value={newItemData.idRoom} onChange={(e) => {
              newItemData.idRoom = e.target.value;
              this.setState({ newItemData });
            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="category">Kategoria</Label>
            <Input type="select" name="category" id="category">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>              
          <FormGroup>
            <Label for="itemName">Nazwa</Label>
            <Input required type="text" name="itemName" id="itemName" placeholder="Nazwa" value={newItemData.itemName} onChange={(e) => {
              newItemData.itemName = e.target.value;
              this.setState({ newItemData });
            }}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addItem.bind(this)}>Add</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewItemModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={editItemModal} toggle={this.toggleEditItemModal.bind(this)} >
        <ModalHeader toggle={this.toggleEditItemModal.bind(this)}>Add a new item</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="idItem">Identyfikator</Label>
            <Input type="text" name="idItem" id="idItem"  value={editItemData.idItem} onChange={(e) => {
              editItemData.idItem = e.target.value;
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
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
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
          <Button color="primary" onClick={this.editItem.bind(this)}>Edit</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditItemModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Room</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            { items.map(this.renderRow) }
        </tbody>
      </Table>
      <FloorGrid />
    </div>
  );
}
}

export default App;
