import React, { Component, useContext } from "react";
import axios from "axios";
import '../App.css';
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
  useHistory, Link
} from "react-router-dom";

import { ItemsContext } from '../REST/Items';

import ItemTable from "./Items/ItemTable";

// import Workshop from "../Workshop/Workshop";
// import NMLoggedIn from "../NavMenu/NMLoggedIn";
// import FloorManager from "./FloorManager";
// import UserProfile from "../Profile/UserProfile";
// import Calendar from '../Calendar/Calendar';

const Floor = () => {

    const {items} = useContext(ItemsContext);

    return (
      <div >
       {!items.status === "pending" ? "loading..." : <ItemTable/> }
      </div>
    );
  }


export default Floor;
