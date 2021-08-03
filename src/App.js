import './App.css';

import { BrowserRouter as Router, Route,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import LandingPage from './LandingPage/LandingPage'

// import FloorManager from './FloorPanel/FloorManager';
import LoggedIn from "./FloorPanel/LoggedIn";
import { AuthProvider } from "./Authorization/Auth";
import PrivateRoute from "./Authorization/PrivateRoute";

import NavMenu from './NavMenu/NavMenu';
import { ModalProvider } from "./Modals/ModalContext";

function App() {

  return (
    <div className="container-fluid p-0" >
      <AuthProvider>
        <Router>
          <div>
          <ModalProvider>
            <NavMenu/>
            <Route exact path="/" component={LandingPage} />
          </ModalProvider>
            <PrivateRoute
              exact
              path="/floor"
              component={() => (
                <LoggedIn /> 
                // <FireDataProvider>
                // <Viewer/>
                // <></>
                // <FloorManager/>
                // </FireDataProvider>
              )}
            />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;