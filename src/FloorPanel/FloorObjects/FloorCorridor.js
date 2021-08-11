import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

import { Button } from "reactstrap";

const FloorCorridor = (props) => {
  const [roomFocused, setRoomFocused] = useState(false);
  const [roomActive, setRoomActive] = useState(false);
  return (
    <Button
      color="light"
      className="corridor"
      style={styles.room({
        number: "c" + props.number,
        focused: roomFocused,
        active: roomActive,
      })}
      onFocus={() => setRoomFocused(true)}
      onBlur={() => setRoomFocused(false)}
      onMouseEnter={() => setRoomActive(true)}
      onMouseLeave={() => setRoomActive(false)}
    >
      {props.type === "duty" ? (
        <span style={{ color: "red" }}>
          {" "}
          <FontAwesomeIcon icon={faPhone} />{" "}
        </span>
      ) : (
        ""
      )}{" "}
      {props.number}
    </Button>
  );
};

export default FloorCorridor;

const styles = {
  room: ({ number }) => ({
    textAlign: "center",
    fontSize: "10",
    gridArea: number,
  }),
};
