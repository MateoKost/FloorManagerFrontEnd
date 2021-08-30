import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LandingPage from "./LandingPage/LandingPage";
import Floor from "./FloorPanel/Floor";
import Workshop from "./Workshop/Workshop";

import { AuthProvider } from "./Authorization/Auth";
import PrivateRoute from "./Authorization/PrivateRoute";

import NavMenu from "./NavMenu/NavMenu";
import { ModalProvider } from "./LandingPage/Modals/ModalContext";

import { ItemsProvider } from "./REST/Items";
import { PersonnelProvider } from "./REST/Personnel";
import { PaymentProvider } from "./REST/Payment";

function App() {
  return (
    <div className="container-fluid p-0">
      <AuthProvider>
        <Router>
          <div>
            <ModalProvider>
              <NavMenu />
              <Route exact path="/" component={LandingPage} />
            </ModalProvider>
            <ItemsProvider>
              <PersonnelProvider>
                <PrivateRoute path="/floor" component={() => <Floor />} />
                <PaymentProvider>
                  <PrivateRoute
                    path="/workshop"
                    component={() => <Workshop />}
                  />
                </PaymentProvider>
              </PersonnelProvider>
            </ItemsProvider>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
