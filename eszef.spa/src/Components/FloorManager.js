import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Alert, Table, Button, Navbar } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPen,
  faChair,
  faHammer
} from "@fortawesome/free-solid-svg-icons";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import itemIconNames from "./IconNames";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import FloorGrid from "./FloorGrid";
import Workshop from "./Workshop";
import NMLoggedIn from "./NMLoggedIn";


import { 
  Collapse, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, 
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText
} from 'reactstrap';


class FloorManager extends Component {
  constructor(props) {
    super(props);
    let token = "Bearer " + JSON.parse(localStorage.getItem("login")).store;
    this.state = {
      token: token,
      items: [],
      soldiers: [],
      selectedRoomData: {
        roomItems: [],
        roomSoldiers: [],
        roomId: "",
      },

      selectedRoomId: "",

      editItemData: {
        id: "",
        idRoom: "",
        itemName: "",
      },

      editItemModal: false,
      newItemModal: false,

      addedData: {
        id: "",
        idRoom: "",
        itemName: "",
      },

      // addedItem: false,
      // deletedItem: false,
      // newItemModal: false,

      alertVisibility: false,
      alertVisibilityDeleted: false,

      itemNames: itemIconNames,
    };

    this.toggleEditItemModal = this.toggleEditItemModal.bind(this);
    this.toggleNewItemModal = this.toggleNewItemModal.bind(this);
  }

  componentDidMount() {
    this.getItems();
    this.getSoldiers();
  }


  getSoldiers = async () => {
    await axios
      .get("https://localhost:5001/soldier", {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((response) => {
        this.setState({
          soldiers: response.data,
        });
      });
  };



  getItems = async () => {
    await axios
      .get("https://localhost:5001/item", {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((response) => {
        this.setState({
          items: response.data,
        });
      });
  };

  getRoomItems = async (roomId) => {
    // const { roomItems, selectedRoomId } = this.state;
    await axios
      .get("https://localhost:5001/room/" + parseInt(roomId), {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((response) => {
        this.setState({
          selectedRoomData: {
            roomItems: response.data.items,
            roomSoldiers: response.data.soldiers,
            roomId: roomId,
          },
        });
      });
  };

  addItem = async (newItemData) => {
    const { items } = this.state;
    let params2 = {
      itemName: newItemData.itemName,
      idRoom: parseInt(newItemData.idRoom),
    };

    axios
      .post("https://localhost:5001/item", params2, {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((_) => {
        this.getItems();
        this.setState({
          newItemModal: false,
          items,
          newItemData: {
            id: "",
            idRoom: "",
            itemName: "",
          },
          addedData: {
            id: "",
            idRoom: newItemData.idRoom,
            itemName: newItemData.itemName,
          },
          alertVisibility: true,
          addedItem: true,
        });
      });
  };

  editItem = async () => {
    const { editItemData, items } = this.state;
    await fetch(
      `http://localhost:1234/items/edit?id=${editItemData.id}&idRoom=${editItemData.idRoom}&itemName=${editItemData.itemName}`,
      {}
    ).then((response) => {
      console.log(response.data);
      this.getItems();
      this.setState({
        editItemModal: false,
        items,
        editItemData: {
          id: "",
          idRoom: "",
          itemName: "",
        },
      });
    });
  };

  toggleSuccessAlerts() {
    this.setState({
      alertVisibility: false,
    });
  }

  toggleWarningAlerts() {
    this.setState({
      alertVisibilityDeleted: false,
    });
  }

  toggleEditItemModal() {
    this.setState({
      editItemModal: !this.state.editItemModal,
    });
  }

  toggleNewItemModal() {
    this.setState({
      newItemModal: !this.state.newItemModal,
    });
  }

  setEditItemData(id, idRoom, itemName) {
    this.toggleEditItemModal();
    this.setState({
      editItemData: {
        id: id,
        idRoom: idRoom,
        itemName: itemName,
      },
    });
  }

  deleteItem = async (id) => {
    const { items } = this.state;
    await axios
      .delete(`https://localhost:5001/item/${id}`, {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((_) => {
        const dataById = items.find((item) => item.id === id);
        this.setState({
          addedData: dataById,
          deletedItem: true,
          alertVisibilityDeleted: true,
        });
        console.log(_);
        this.getItems();
      });
  };

  onDismiss = () => this.setState({ alertVisibility: false });
  onDismissDeleted = () => this.setState({ alertVisibilityDeleted: false });

  renderRow = ({ id, idRoom, itemName, isRepaired }) => (
    <tr key={id} style={  { backgroundColor: !isRepaired && '#FFF3DB'} }  >
      <td>{id}</td>
      <td>{idRoom}</td>
      <td>{itemName}</td>
      <td>
        {this.state.itemNames.find((item) => item.name === itemName) ? (
          this.state.itemNames.find((item) => item.name === itemName).faIcon
        ) : (
          <FontAwesomeIcon icon={faChair} />
        )}
      </td>
      <td>{isRepaired ? "1" : "0"}</td>
      <td>
      <Button disabled={isRepaired}
          color="warning"
          size="sm"
          className="mr-2"
          onClick={this.setEditItemData.bind(this, id, idRoom, itemName)}
        >
          <FontAwesomeIcon icon={faHammer} />
        </Button>

        <Button
          color="success"
          size="sm"
          className="mr-2"
          onClick={this.setEditItemData.bind(this, id, idRoom, itemName)}
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <Button
          color="danger"
          size="sm"
          onClick={this.deleteItem.bind(this, id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  );

  renderSoldier = ({ idSoldier, name, lastName, rank, idRoom }) => (
    <tr key={idSoldier}>
      <td>{rank}</td>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{idRoom}</td>

      <td>
        <Button
          color="success"
          size="sm"
          className="mr-2"
          onClick={this.setEditItemData.bind(
            this,
            idSoldier,
            name,
            lastName,
            rank,
            idRoom
          )}
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <Button
          color="danger"
          size="sm"
          onClick={this.deleteItem.bind(this, { idSoldier })}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  );

  selectRoom = (roomId) => {
    this.setState({
      selectedRoomId: roomId,
    });
    this.getRoomItems(roomId);
  };

  render() {
    const {
      items, soldiers,
      addedData,
      addedItem,
      alertVisibility,
      deletedItem,
      alertVisibilityDeleted,
      selectedRoomData,
      selectedRoomId,
    } = this.state;

    return (
      <div >


        <div className="row" >
        <div className="col-lg-2"></div>
          <div className="col-lg-8">
          <h1>11 kompania</h1>
            <FloorGrid selectRoom={this.selectRoom} />
            {alertVisibility && (
              <Alert
                color="success"
                isOpen={alertVisibility}
                toggle={this.toggleSuccessAlerts.bind(this)}
              >
                Dodano <b>{addedData.itemName}</b> do pokoju nr{" "}
                <b>{addedData.idRoom}</b>.
              </Alert>
            )}

            {alertVisibilityDeleted && (
              <Alert
                color="warning"
                isOpen={alertVisibilityDeleted}
                toggle={this.toggleWarningAlerts.bind(this)}
              >
                Usunięto <b>{addedData.itemName}</b> z pokoju nr{" "}
                <b>{addedData.idRoom}</b>.
              </Alert>
            )}
          </div>
          <div className="col-lg-2"></div>
        </div>
        <h2> {selectedRoomId !== "" ? ( "Wybrano pokój nr " + selectedRoomId ) : "Nie wybrano"} </h2>
        <Button color="info" onClick={e => { this.setState({selectedRoomId: ""}) }}>
              Pokaż ze wszystkich pokoi 
            </Button>
        <div className="row  p-4">



          <AddModal
            onEnter={this.addItem}
            onCancel={this.toggleNewItemModal}
            newItemModal={this.state.newItemModal}
          />
          <EditModal
            onENter={this.editItem}
            editItemData={this.state.editItemData}
            editItemModal={this.state.editItemModal}
            onCancel={this.toggleEditItemModal}
          />
         
          <div className="col-lg-6 ">

          <Navbar className="navbar-dark bg-dark"  expand="md">
        <NavbarBrand >Lista żołnierzy</NavbarBrand>
 <Nav className="mr-auto" navbar>
     </Nav>
        <Button color="info" onClick={this.toggleNewItemModal}>
              <FontAwesomeIcon icon={faPlus} /> Dodaj nowego żołnierza
            </Button>
        
          {/* <NavbarText>Zaloguj</NavbarText> */}
      
      </Navbar>
 
 {
         
        <Table striped>
          <thead><tr><th>Stopień</th> <th>Imię</th> <th>Nazwisko</th> <th>Pokój</th> <th>Akcje</th></tr></thead>
          <tbody>{ selectedRoomId==="" ? soldiers.map(this.renderSoldier) : selectedRoomData.roomSoldiers.map(this.renderSoldier) }</tbody>
        </Table>
  }      


          </div>
          <div className="col-lg-6">
  
            {/* <Button color="primary" onClick={this.toggleNewItemModal.bind(this)}><FontAwesomeIcon icon={faPlus} /> Dodaj nowe wyposażenie</Button> */}

            <Navbar className="navbar-dark bg-dark"  expand="md">
        <NavbarBrand >Lista wyposażenia</NavbarBrand>
 <Nav className="mr-auto" navbar>
     </Nav>
        <Button  color="info" onClick={this.toggleNewItemModal}>
              <FontAwesomeIcon icon={faPlus} /> Dodaj nowe wyposażenie
            </Button>
        
          {/* <NavbarText>Zaloguj</NavbarText> */}
      
      </Navbar>


        

      <Table striped>
              <thead>
                <tr>
                  <th>#</th> <th>Pomieszczenie</th> <th>Nazwa</th>{" "}
                  <th>Ikona</th><th>Stan</th> <th>Akcje</th>
                </tr>
              </thead>
              <tbody>{ selectedRoomId==="" ? items.map(this.renderRow) : selectedRoomData.roomItems.map(this.renderRow) }</tbody>
            </Table>

          </div>
        </div>
      </div>
    );
  }
}

export default FloorManager;
