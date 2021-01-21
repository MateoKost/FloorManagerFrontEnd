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
    // this.setState({
    //     token:token2
    // })
    this.getItems();
    //
  }

  getItems = async () => {
    //let token = "Bearer " +JSON.parse(localStorage.getItem('login')).store;

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
        //   console.log(response.data)
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

  renderRow = ({ id, idRoom, itemName }) => (
    <tr key={id}>
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

      <td>
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
    // console.log(roomId);
    this.setState({
      selectedRoomId: roomId,
    });
    this.getRoomItems(roomId);
  };

  render() {
    const {
      items,
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
        <NMLoggedIn />
        <Switch>
          <Route path="/manage/workshop" component={Workshop} />
        </Switch>

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
        <h1> {selectedRoomId !== "" ? ( "Wybrano pokój nr " + selectedRoomId ) : "Nie wybrano"} </h1>
        <div className="row  p-4">
          {/* <div className="col-lg-6"> 
             <Table>
          <thead><tr><th>Stopień</th> <th>Imię</th> <th>Nazwisko</th> <th>Pokój</th> <th>Akcje</th></tr></thead>
          <tbody>{ selectedRoomData.roomSoldiers.map(this.renderSoldier) }</tbody>
        </Table>
             </div> */}


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
        <Button color="primary" onClick={this.toggleNewItemModal}>
              <FontAwesomeIcon icon={faPlus} /> Dodaj nowego żołnierza
            </Button>
        
          {/* <NavbarText>Zaloguj</NavbarText> */}
      
      </Navbar>
 
 


            <Table striped>
              <thead>
                <tr>
                  <th>#</th> <th>Pomieszczenie</th> <th>Nazwa</th>{" "}
                  <th>Ikona</th> <th>Akcje</th>
                </tr>
              </thead>
              <tbody>{selectedRoomData.roomItems.map(this.renderRow)}</tbody>
            </Table>
          </div>
          <div className="col-lg-6">
  
            {/* <Button color="primary" onClick={this.toggleNewItemModal.bind(this)}><FontAwesomeIcon icon={faPlus} /> Dodaj nowe wyposażenie</Button> */}

            <Navbar className="navbar-dark bg-dark"  expand="md">
        <NavbarBrand >Lista wyposażenia</NavbarBrand>
 <Nav className="mr-auto" navbar>
     </Nav>
        <Button color="primary" onClick={this.toggleNewItemModal}>
              <FontAwesomeIcon icon={faPlus} /> Dodaj nowe wyposażenie
            </Button>
        
          {/* <NavbarText>Zaloguj</NavbarText> */}
      
      </Navbar>

      <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pomieszczenie</th>
                  <th>Nazwa</th>
                  <th>Ikona</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody> {items.map(this.renderRow)} </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default FloorManager;
