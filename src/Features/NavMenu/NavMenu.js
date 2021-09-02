import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUser,
  faClipboardList,
  faUsers,
  faSignInAlt,
  faHammer,
  faTasks,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./NM.css";

import { useHistory } from "react-router-dom";

import { ModalContext } from "../LandingPage/Modals/ModalContext";
import { AuthContext } from "../../REST/Authorization/Auth";

const dhda_banner = process.env.PUBLIC_URL + "/Assets/banner_epic.svg";

const NavMenu = () => {
  const { currentUser, signOut } = useContext(AuthContext);
  const { toggleSignInModal } = useContext(ModalContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  let history = useHistory();

  return (
    <div>
      <Navbar className="navbar-dark bg-dark" expand="md">
        <NavbarBrand href="/">
          <img className="brand" src={dhda_banner} alt={"DHDA"} />{" "}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/MateoKost/Distance_Health_Distance_Active_Remaster">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
          {currentUser ? (
            <span>
              <NMButton
                disabled={false}
                onClick={() => history.push("/floor")}
                icon={faUsers}
                label="Piętro"
              />
              <NMButton
                disabled={false}
                onClick={() => history.push("/workshop")}
                icon={faHammer}
                label="Warsztat"
              />
              <NMButton
                disabled={false}
                onClick={() => history.push("/calendar")}
                icon={faCalendarAlt}
                label="Kalendarz"
              />
              <NMButton
                disabled={true}
                onClick={() => console.log("Excel")}
                icon={faClipboardList}
                label="Excel"
              />
              <NMButton
                disabled={true}
                onClick={() => console.log("Profil")}
                icon={faUser}
                label="Profil"
              />
              <NMButton
                disabled={false}
                onClick={() => signOut()}
                icon={faSignOutAlt}
                label="Wyloguj się"
              />
            </span>
          ) : (
            <NMButton
              disabled={false}
              onClick={() => toggleSignInModal()}
              icon={faSignInAlt}
              label="Zaloguj"
            />
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

const NMButton = ({ onClick, icon, label, disabled }) => {
  const btnStyle = {
    minWidth: "100px",
    borderWidth: "0px",
  };

  return (
    <Button color="dark" style={btnStyle} onClick={onClick} disabled={disabled}>
      <div>
        <FontAwesomeIcon icon={icon} className="fa-lg" />
      </div>
      <div style={{ marginTop: -4 }}>
        <span style={{ fontSize: 12 }}>{label}</span>
      </div>
    </Button>
  );
};

export default NavMenu;
