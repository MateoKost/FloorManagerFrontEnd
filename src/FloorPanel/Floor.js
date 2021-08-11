import React, { useContext, useState } from "react";
import { Button } from "reactstrap";

import "../App.css";

import { ItemsContext } from "../REST/Items";
import { PersonnelContext } from "../REST/Personnel";

import ItemTable from "./Items/ItemTable";
import PersonnelTable from "./Personnel/PersonnelTable";

import FloorGrid from "./FloorObjects/FloorGrid";
import AlertPanel from "./Alerts/AlertPanel";

import SpinnerGroup from "../Utilities/SpinnerGroup";
import "../Utilities/Spinner.css";

const Floor = () => {
  const { items, setSelectedRoom: filterItems } = useContext(ItemsContext);
  const { personnel, setSelectedRoom: filterPersonnel } =
    useContext(PersonnelContext);

  const [selectedRoom, setRoom] = useState("");
  // const [alertData, setAlertData] = useState("");

  const selectRoom = (roomId) => {
    setRoom(roomId);
    filterItems(roomId);
    filterPersonnel(roomId);
  };

  // const updateAlertData = (data, entity, type) => {
  //   console.log(data, entity, type);
  //   setAlertData({
  //     alertData: {
  //       data: data,
  //       entity: entity,
  //       type: type,
  //       visibility: true,
  //     },
  //   });
  // };

  return (
    <div className="container-fluid">
      <div className="row p-0 m-0">{/* Alerts */}</div>
      <div className="row p-0 m-0">
        <div className="col-lg-2 p-0"></div>
        <div className="col-lg-8 p-0">
          <h1 className="text-center">5-te piętro</h1>
          <FloorGrid selectRoom={selectRoom} />
        </div>
        <div className="col-lg-2 p-0"></div>
      </div>
      <div className="row p-0 m-0">
        {/* <AlertPanel {...alertData} /> */}
        <AlertPanel />
      </div>
      <div className="row p-0 m-0 gridCenter">
        <h2>
          {selectedRoom !== ""
            ? "Wybrano pokój nr " + selectedRoom
            : "Nie wybrano"}{" "}
        </h2>
        <Button
          color="info"
          onClick={() => {
            selectRoom("");
          }}
        >
          Pokaż ze wszystkich pomieszczeń
        </Button>
      </div>
      <div className="row p-1">
        <div className="col-lg-6 p-1">
          {!items.status === "pending" ? <SpinnerGroup /> : <ItemTable />}
        </div>
        <div className="col-lg-6 p-1">
          {!personnel.status === "pending" ? (
            <SpinnerGroup />
          ) : (
            <PersonnelTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default Floor;
