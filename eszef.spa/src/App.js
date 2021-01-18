import logo from './logo.svg';
import './App.css';

import { Label, FormGroup, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import FloorGrid from './Components//FloorGrid';
import NavMenu from './Components/NavMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faPen,
  faLightBulb,
  faChair,
  faFireExtinguisher,
  faTshirt,
  faMugHot,
  faInbox,
  faBed,
  faBookOpen,
  faBook,
  faMedkit,
  faFileAlt,
  faKey,
  faServer,
  faBroom,
  faBrush,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons'
// import axios from 'axios';


import { Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from 'react';

import  axios  from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
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
      newItemModal: false,
      editItemModal: false,
      alertVisibility:true,

      // itemNames:[
      //   "Lampka", 
      //   "Krzesło",
      //   "Gaśnica",
      //   "Szafa",
      //   "Czajnik",
      //   "Komoda",
      //   "Łóżko",
      //   "Biurko",
      //   "Regał",
      //   "Apteczka",
      //   "Dokumentacja",
      //   "Szafka z kluczami",
      //   "Serwer",
      //   "Miotła",
      //   "Szczotka",
      //   "Śmietnik"
      // ],

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
    // axios.get('http://localhost:3000/items').then((response) => {
    //   this.setState({ 
    //     items: response 
    //   })
    // });

   this.getItems();


  }

  /*
getItems = async () => {
  await fetch('http://localhost:1234/items',{method: 'GET', mode: 'cors', credentials: 'omit'})
  .then(response => {return response.json();})
  // .then(response => {return JSON.stringify(response);})
  .then(response => {console.log('BEFORE',response); {return response.data}})
  .then(response => {this.setState({ items: response })})
  .catch(err => console.error(err))
}*/

getItems = async() => {
  await axios.get("https://localhost:5001/item").then(response => {  
              this.setState({  
              items: response.data 
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

  // await axios.post('https://localhost:5001/item',{
  //     itemName: newItemData.itemName, 
  //     idRoom: newItemData.idRoom
  // });
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
          addedItem: true,
        });
  });

  // await axios.post(`https://localhost:5001/item?itemName=${newItemData.itemName}&idRoom=${newItemData.idRoom}`).then( _ => {
  //   this.getItems()
  //   this.setState({ 
      
  //     newItemModal: false,  
  //     items, 
  //     newItemData: {
  //       idItem: '',
  //       idRoom: '',
  //       itemName: '',
  //     }
  //   });
  // });
};


// addItem = async () => {
//   const { newItemData, items } = this.state;
//   await fetch(`http://localhost:1234/items/add?idItem=${newItemData.idItem}&idRoom=${newItemData.idRoom}&itemName=${newItemData.itemName}`, {
//     //method: 'POST', mode: 'cors', credentials: 'omit', body: JSON.stringify(this.state.newItemData)
//   }).then( _ => {
//     this.getItems();
//     //console.log(response.data)
//     //const { items } = this.state;
//     //items.push(response.data);
//     this.setState({ 
      
//       newItemModal: false,  
//       items, 
//       newItemData: {
//         idItem: '',
//         idRoom: '',
//         itemName: '',
//       }
//     });
//   });
// };

editItem = async () =>{
  const { editItemData, items } = this.state;
  await fetch(`http://localhost:1234/items/edit?id=${editItemData.id}&idRoom=${editItemData.idRoom}&itemName=${editItemData.itemName}`, {
    //method: 'POST', mode: 'cors', credentials: 'omit', body: JSON.stringify(this.state.newItemData)
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
    this.getItems();


        });
  };

  onDismiss = () => this.setState({ alertVisibility:false });
// deleteItem = async ({idItem}) =>{
//   const { items } = this.state;
//   await fetch(`http://localhost:1234/items/delete?idItem=${idItem}`, {
//     //method: 'POST', mode: 'cors', credentials: 'omit', body: JSON.stringify(this.state.newItemData)
//   }).then(response=>{
//     this.getItems();
//     console.log(response.data)
//     this.setState({ 
//       items
//     });
//   });
// };



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

  render() {
    const { items, newItemModal, newItemData,  addedData, editItemData, editItemModal, addedItem, alertVisibility, itemNames } = this.state;
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
  
      { addedItem &&  <Alert color="success" isOpen={alertVisibility} toggle={this.onDismiss}>
        Dodano <b>{addedData.itemName}</b> do pokoju nr <b>{addedData.idRoom}</b>.
      </Alert> 
      }
    
      <Button color="primary" onClick={this.toggleNewItemModal.bind(this)}><FontAwesomeIcon icon={faPlus} /> Dodaj nowe wyposażenie</Button>
      <Modal isOpen={newItemModal} toggle={this.toggleNewItemModal.bind(this)} >
        <ModalHeader toggle={this.toggleNewItemModal.bind(this)}>Dodaj nowe wyposażenie</ModalHeader>
        <ModalBody>
          {/* <FormGroup>

            <Label for="id">Identyfikator</Label>
            <Input required type="text" name="id" id="id" placeholder="Identyfikator" value={newItemData.id} onChange={(e) => {
              newItemData.id = e.target.value;
              this.setState({ newItemData });
            }}/>
          </FormGroup> */}
          <FormGroup>
            <Label for="idRoom">Pomieszczenie</Label>
            <Input type="number" name="idRoom" id="idRoom" placeholder="Pomieszczenie"value={newItemData.idRoom} onChange={(e) => {
              newItemData.idRoom = e.target.value;
              this.setState({ newItemData });
            }}/>
          </FormGroup>
          {/* <FormGroup>
            <Label for="category">Kategoria</Label>
            <Input type="select" name="category" id="category">
                 { itemNames.map(  (item,i) => <option key={i}>{item.name}</option>  ) }
            </Input>
          </FormGroup>               */}
          <FormGroup>
            <Label for="itemName">Nazwa</Label>
            <Input required type="select" name="itemName" id="itemName" placeholder="Nazwa" value={newItemData.itemName} onChange={(e) => {
              newItemData.itemName = e.target.value;
              this.setState({ newItemData });
            }}>
                 { itemNames.map(  (item,i) => <option key={i}>{item.name}</option>  ) }
            </Input>
            
          </FormGroup>
          {/* <FormGroup>
            <Label for="itemName">Nazwa</Label>
            <Input required type="text" name="itemName" id="itemName" placeholder="Nazwa" value={newItemData.itemName} onChange={(e) => {
              newItemData.itemName = e.target.value;
              this.setState({ newItemData });
            }}/>
          </FormGroup> */}
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
      <FloorGrid />
    </div>
  );
}
}

export default App;
