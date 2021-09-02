import React, { useState } from "react";
import SingleRoom from "./SingleRoom";
import FloorCorridor from "./FloorCorridor";
import FloorStaircase from "./FloorStaircase";
import "./Floor.css";

const FloorGrid = (props) => {
  function selectRoom(roomId) {
    props.selectRoom(roomId);
  }

  return (
    <div className="floorGrid">
      {[...Array(24).keys()].map((number) => (
        <SingleRoom
          key={number}
          number={number}
          type={
            number === 9
              ? "HQ"
              : number === 8
              ? "armoury"
              : number === 22 || number === 23
              ? "loundry"
              : number === 10 || number === 12
              ? "stars"
              : "none"
          }
          selectRoom={selectRoom}
        />
      ))}
      {[...Array(3).keys()].map((number) => (
        <FloorCorridor
          key={number}
          number={number}
          type={number === 1 ? "duty" : "none"}
        />
      ))}
      {[...Array(2).keys()].map((number) => (
        <FloorStaircase key={number} number={number} />
      ))}
    </div>
  );
};

export default FloorGrid;
