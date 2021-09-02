import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LandingPage from "./Features/LandingPage/LandingPage";
import Floor from "./Features/FloorPanel/Floor";
import Workshop from "./Features/Workshop/Workshop";
import Calendar from "./Features/Calendar/Calendar"

import { AuthProvider } from "./REST/Authorization/Auth";
import PrivateRoute from "./REST/Authorization/PrivateRoute";

import NavMenu from "./Features/NavMenu/NavMenu";
import { ModalProvider } from "./Features/LandingPage/Modals/ModalContext";

import { ItemsProvider } from "./REST/Items";
import { PersonnelProvider } from "./REST/Personnel";
import { PaymentProvider } from "./REST/Payment";
import { GCalendarProvider } from "./API/Gapi";

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
            <GCalendarProvider>
              <PrivateRoute path="/calendar" component={() => <Calendar />} />
            </GCalendarProvider>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
