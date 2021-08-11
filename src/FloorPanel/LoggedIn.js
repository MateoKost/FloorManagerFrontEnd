import React  from "react";
import '../App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory, Link
} from "react-router-dom";

import Floor from './Floor';

import { ItemsProvider } from "../REST/Items";
import { PersonnelProvider } from "../REST/Personnel";

// import Workshop from "../Workshop/Workshop";
// import NMLoggedIn from "../NavMenu/NMLoggedIn";
// import FloorManager from "./FloorManager";
// import UserProfile from "../Profile/UserProfile";
// import Calendar from '../Calendar/Calendar';

const LoggedIn = () => {
    return (
      <div >
        {/* <Switch> */}
          {/* <Route path="/manage/workshop" component={Workshop} /> */}

          <ItemsProvider>
            <PersonnelProvider>
          <Route exact path="/floor" component={Floor} />
          </PersonnelProvider>
          </ItemsProvider>
          {/* <Route path="/dashboard" component={<h1>Piętro</h1>} /> */}
          {/* <Route path="/manage/profile" component={UserProfile} /> */}
          {/* <Route path="/manage/calendar" component={Calendar} /> */}
        {/* </Switch> */}
      </div>
    );
  }


export default LoggedIn;
