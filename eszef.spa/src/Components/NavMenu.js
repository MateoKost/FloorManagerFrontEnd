import { 
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, 
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText
} from 'reactstrap';

const NavMenu = () => (
<div>
      <Navbar className="navbar-dark bg-dark"  expand="md">
        <NavbarBrand href="/">E-Szef</NavbarBrand>
        <NavbarToggler 
        // onClick={toggle} 
        />
        <Collapse 
        // isOpen={isOpen} 
        navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/patryklorbiecki1/DistanceHealthDistanceActive">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Zaloguj</NavbarText>
        </Collapse>
      </Navbar>
    </div>
);

export default NavMenu;