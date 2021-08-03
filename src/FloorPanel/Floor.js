import React, { useContext } from "react";
import '../App.css';

import { ItemsContext } from '../REST/Items';
import { PersonnelContext } from '../REST/Personnel';

import ItemTable from "./Items/ItemTable";
import PersonnelTable from "./Personnel/PersonnelTable";

const Floor = () => {

    const {items} = useContext(ItemsContext);
    const {personnel} = useContext(PersonnelContext);

    return (
      <div className="row">
       {!items.status === "pending" ? "loading..." : <ItemTable/> }
       {!personnel.status === "pending" ? "loading..." : <PersonnelTable/> }
      </div>
    );
  }


export default Floor;
