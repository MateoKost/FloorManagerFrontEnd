import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Button } from 'reactstrap';

import NavMenu from './Components/NavMenu';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from 'react';

import LandingPage from './Components/LandingPage'
import FloorManager from './Components/FloorManager'

import  axios  from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
  
  }
}

  componentDidMount(){
    
  }

getItems = async() => {
 
}

  render() {
  return (
    <div className="App conta">

      <Router>

      <NavMenu />
      <Switch>

      <Route exact path="/" component={LandingPage} />
      <Route path="/manage" component={FloorManager} />

      </Switch>

      </Router>
    </div>
  );
}
}

export default App;
