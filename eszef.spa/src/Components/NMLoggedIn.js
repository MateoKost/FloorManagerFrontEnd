import { 
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText
} from 'reactstrap';
import '../App.css';
import { useHistory } from "react-router-dom";
import eszef from "../Assets/Eszef.png";


import GoogleExcel from "./GoogleExcel";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faTrash,
  faPen,
  faChair,
  faHammer,
  faSignOutAlt,
  faTasks,
  faUser,
  faCalendarAlt

} from "@fortawesome/free-solid-svg-icons";




const NavMenu = () => {

  const history = useHistory();
  const banner = process.env.PUBLIC_URL + '/Assets/banner_epic.svg';

  return (

<div>
      <Navbar className="navbar-dark bg-dark"  expand="md">
      <NavbarBrand href="/"><img  className="dhda" src={banner} alt={"Eszef"} /> </NavbarBrand> 
        <NavbarToggler 
        // onClick={toggle} 
        />
        <Collapse 
        // isOpen={isOpen} 
        navbar>
          <Nav className="mr-auto" navbar>
     
            {/* <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="https://github.com/patryklorbiecki1/Eszef">GitHub</NavLink>
            </NavItem>
          </Nav>

       



          <Button color="dark"  style={{minWidth:"100px"}} onClick={e=>{ history.push("/manage/calendar"); }  }>
      <div><FontAwesomeIcon icon={faCalendarAlt} className="fa-lg"/></div>
      <div style={{marginTop: -4}}><span style={{fontSize: 12}}>Kalendarz</span></div>
      </Button>


          <GoogleExcel />

          <Button color="dark"  style={btnStyle} onClick={e=>{ history.push("/manage/floor"); }  }>
          <div><FontAwesomeIcon icon={faTasks} className="fa-lg"/></div>
          <div style={{marginTop: -4}}><span style={{fontSize: 12}}>Piętro</span></div>
          </Button>

          <Button color="dark"  style={btnStyle} onClick={e=>{ history.push("/manage/workshop"); }  }>
          <div><FontAwesomeIcon icon={faHammer} className="fa-lg"/></div>
          <div style={{marginTop: -4}}><span style={{fontSize: 12}}>Warsztat</span></div>
             </Button>
       
          <Button color="dark"  style={btnStyle} onClick={e=>{ history.push("/manage/profile"); }  }>
          <div><FontAwesomeIcon icon={faUser} className="fa-lg"/></div>
          <div style={{marginTop: -4}}><span style={{fontSize: 12}}>Profil</span></div>
          </Button>

          <Button color="dark"  style={btnStyle} onClick={e=>{ localStorage.clear(); history.push("/"); }  }>       
          <div><FontAwesomeIcon icon={faSignOutAlt} className="fa-lg"/></div>
          <div style={{marginTop: -4}}><span style={{fontSize: 12}}>Wyloguj się</span></div>
          </Button>
          {/* <NavbarText>Zaloguj</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
)};

const btnStyle = {
  minWidth: "100px",
  borderWidth: "0px"
}


export default NavMenu;
