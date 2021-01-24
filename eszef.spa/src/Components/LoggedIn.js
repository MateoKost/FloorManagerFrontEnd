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
import UserProfile from "./FloorObjects/UserProfile";
import Calendar from './Calendar';


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
          <Route path="/manage/profile" component={UserProfile} />
          <Route path="/manage/calendar" component={Calendar} />
        </Switch>
      </div>
    );
  }
}

export default LoggedIn;
