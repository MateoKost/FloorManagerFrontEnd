import React, { useEffect, useState, useContext, useCallback, useMemo } from "react";

import { Table, Button, Navbar } from "reactstrap";
import { NavbarBrand, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddPersonnelModal from "./AddPersonnelModal";
import EditPersonnelModal from "./EditPersonnelModal";

import PersonnelRow from "./PersonnelRow";

import { PersonnelContext } from '../../REST/Personnel';


export const PersonnelTable = () => {

  const { personnel, selectedRoom, setNewPersonnelModal } = useContext(PersonnelContext);

  // let content;

  // const content = useCallback(
  //   () => {
 
  //     if (items.status==="pending") {
  //       console.log("pending");
  //       return <div className="loader">Loading...</div>;
  //     } else if (items.status === "fulfilled") {
  //       console.log("fulfilled");
  //       console.log(items.data);
  //       return
  //         ( items.data &&   items.data.map((item) => (
  //             <ItemRow
  //               item={item}
  //             />
  //           )) )
  //     } else if (items.status === "failed") {
  //       return <div>error!!!</div>;
  //     }



  //   },
  //   [],
  // );

  let content;
  if (personnel.status==="pending") {
    console.log("pending");
    content = <div className="loader">Loading...</div>;
  } else if (personnel.status === "fulfilled") {
    console.log("fulfilled");
    // console.log(items.data);
    content =
    personnel.data &&   personnel.data.map((employee) => (
          <PersonnelRow
            personnel={employee}
          />
        ))
  } else if (PersonnelRow.status === "failed") {
    content = <div>error!!!</div>;
  }

  return (
    <div className="col-lg-6">

          <AddPersonnelModal
          //   onEnter={this.addSoldier}
          //  // newSoldierData={this.state.newSoldierData}
          //   newSoldierModal={this.state.newSoldierModal}
          //   onCancel={this.toggleNewSoldierModal}
          />

          <EditPersonnelModal
            // onEnter={this.editSoldier}
            // editSoldierData={this.state.editSoldierData}
            // editSoldierModal={this.state.editSoldierModal}
            // onCancel={this.toggleEditSoldierModal}
          />


          <Navbar className="navbar-dark bg-dark" expand="md">
              <NavbarBrand>Lista pracowników</NavbarBrand>
              <Nav className="mr-auto" navbar></Nav>
              <Button color="info"  
                        onClick={() => setNewPersonnelModal(true)}
              // onClick={this.toggleNewSoldierModal}
              >
                <FontAwesomeIcon icon={faPlus} /> Dodaj 
              </Button>
            </Navbar>

            {
              <Table striped>
                <thead>
                idroom{selectedRoom}
                  <tr>
                    {/* <th>Stopień</th> */}
                     <th>Imię</th> <th>Nazwisko</th>{" "}
                    <th>Pokój</th> <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {content}
                </tbody>
              </Table>
            }



      {/* <AddModal/>
 
      <EditModal
      />

      <Navbar className="navbar-dark bg-dark" expand="md">
        <NavbarBrand>Lista wyposażenia</NavbarBrand>
        <Nav className="mr-auto" navbar></Nav>
        <Button
          color="info"
          onClick={() => setNewItemModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Dodaj
        </Button>
      </Navbar>

      <Table striped >
        <thead>
          idroom{selectedRoom}
          <tr>
            <th>#</th>
            <th>Pokój</th>
            <th>Nazwa</th>
            <th>Stan</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </Table> */}
    </div>
  );
};

export default PersonnelTable;
