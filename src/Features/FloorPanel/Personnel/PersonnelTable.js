import React, { useContext } from "react";

import { Table, Button, Navbar } from "reactstrap";
import { NavbarBrand, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddPersonnelModal from "./AddPersonnelModal";
import EditPersonnelModal from "./EditPersonnelModal";

import PersonnelRow from "./PersonnelRow";

import { PersonnelContext } from "../../../REST/Personnel";

import SpinnerGroup from "../../../Utilities/SpinnerGroup";

export const PersonnelTable = () => {
  const { personnel, selectedRoom, setNewPersonnelModal } =
    useContext(PersonnelContext);

  let content;
  if (personnel.status === "pending") {
    console.log("pending");
    content = <SpinnerGroup/>;
  } else if (personnel.status === "fulfilled") {
    console.log("fulfilled");
    content =
      personnel.data &&
      personnel.data.map((employee) => <PersonnelRow personnel={employee} />);
  } else if (PersonnelRow.status === "failed") {
    content = <div>error!!!</div>;
  }

  return (
    <div className="col-12 p-0">
      
      <AddPersonnelModal />
      <EditPersonnelModal />

      <Navbar className="navbar-dark bg-dark" expand="md">
        <NavbarBrand>Lista pracowników</NavbarBrand>
        <Nav className="mr-auto" navbar></Nav>
        <Button color="info" onClick={() => setNewPersonnelModal(true)} disabled={personnel.status === "fulfilled" ? "" : "true" }>
          <FontAwesomeIcon icon={faPlus} /> Dodaj
        </Button>
      </Navbar>

      {
        <Table striped>
          <thead>
            {/* idroom{selectedRoom} */}
            <tr>
              {/* <th>Stopień</th> */}
              <th>Imię</th> <th>Nazwisko</th> <th>Pokój</th> <th>Akcje</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </Table>
      }
    </div>
  );
};

export default PersonnelTable;
