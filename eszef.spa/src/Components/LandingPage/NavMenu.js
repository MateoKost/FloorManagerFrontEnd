import { 
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText
} from 'reactstrap';

import { useHistory } from "react-router-dom";
import '../../App.css';
import eszef from "../../Assets/Eszef.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignInAlt
} from "@fortawesome/free-solid-svg-icons";



const NavMenu = (props) => {

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


     


          <Button color="dark" style={btnStyle} onClick={props.onClick} >
            <div><FontAwesomeIcon icon={faSignInAlt} className="fa-lg"/></div>
            <div style={{marginTop: -4}}><span style={{fontSize: 12}}>Zaloguj</span></div>
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
