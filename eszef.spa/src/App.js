import './App.css';

import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";

import { Button } from 'reactstrap';


import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from 'react';

import LandingPage from './Components/LandingPage'
import FloorManager from './Components/FloorManager'

import  axios  from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      history: useHistory,
  }
}

  componentDidMount(){
    
  }

getItems = async() => {
 
}

  render() {
  return (
    <div className="App conta">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/manage" component={FloorManager} />
      </Switch>
    </div>
  );
}
}

export default App;
