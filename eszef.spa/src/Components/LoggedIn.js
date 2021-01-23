import React, { Component } from "react";
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
  useHistory,
} from "react-router-dom";


import Workshop from "./FloorObjects/Workshop";
import NMLoggedIn from "./NMLoggedIn";
import FloorManager from "./FloorObjects/FloorManager";



class LoggedIn extends Component {
  constructor(props) {
    super(props);
    //let token = "Bearer " + JSON.parse(localStorage.getItem("login")).store;
    this.state = {
   
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div >
        <NMLoggedIn />
        <Switch>
          <Route path="/manage/workshop" component={Workshop} />
          <Route path="/manage/floor" component={FloorManager} />
        </Switch>
      </div>
    );
  }
}

export default LoggedIn;
