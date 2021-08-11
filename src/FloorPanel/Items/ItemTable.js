import React, { useEffect, useState, useContext, useCallback, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Navbar } from "reactstrap";
import { NavbarBrand, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";
import ItemRow from "./ItemRow";
import { ItemsContext } from '../../REST/Items';

import SpinnerGroup from "../../Utilities/SpinnerGroup";

export const ItemTable = () => {

  const { items, selectedRoom, setNewItemModal } = useContext(ItemsContext);

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
  if (items.status==="pending") {
    console.log("pending");
    content = <SpinnerGroup/>;
  } else if (items.status === "fulfilled") {
    console.log("fulfilled");
    // console.log(items.data);
    content =
      items.data &&   items.data.map((item) => (
          <ItemRow
            item={item}
          />
        ))
  } else if (items.status === "failed") {
    content = <div>error!!!</div>;
  }

  return (
    <div className="col-12 p-0">
      <AddItemModal/>
      <EditItemModal/>

      <Navbar className="navbar-dark bg-dark" expand="md">
        <NavbarBrand>Lista wyposażenia</NavbarBrand>
        <Nav className="mr-auto" navbar></Nav>
        <Button
          color="info"
          onClick={() => setNewItemModal(true)}
          disabled={items.status === "fulfilled" ? "" : "true" }
        >
          <FontAwesomeIcon icon={faPlus} /> Dodaj
        </Button>
      </Navbar>

      <Table striped >
        <thead>
          {/* idroom{selectedRoom} */}
          <tr>
            <th>#</th>
            <th>Pokój</th>
            <th>Nazwa</th>
            <th>Stan</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </Table>
    </div>
  );
};

export default ItemTable;
