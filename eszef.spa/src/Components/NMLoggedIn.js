import { 
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText
} from 'reactstrap';
import '../App.css';
import { useHistory } from "react-router-dom";
import eszef from "../Assets/Eszef.png";
const NavMenu = () => {

  const history = useHistory();

  return (

<div>
      <Navbar className="navbar-dark bg-dark"  expand="md">
       <img  className="logo" src={eszef}  alt={"Eszef"} />
        <NavbarBrand href="/">E-Szef</NavbarBrand>
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
          <Button color="secondary"  onClick={e=>{ history.push("/manage"); }  }> Piętro</Button>
          <Button color="secondary"  onClick={e=>{ history.push("/manage/workshop"); }  }> Warsztat</Button>
          <Button color="secondary"  onClick={e=>{ localStorage.clear(); history.push("/"); }  }> Wyloguj się</Button>
          {/* <NavbarText>Zaloguj</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
)};

export default NavMenu;
