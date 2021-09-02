import React, { useState } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faShieldAlt,
  faCrown,
  faShower,
} from "@fortawesome/free-solid-svg-icons";

const SingleRoom = (props) => {
  const [roomFocused, setRoomFocused] = useState(false);
  const [roomActive, setRoomActive] = useState(false);

  function selectRoom(roomId) {
    props.selectRoom(props.number);
  }

  return (
    <Button
      color="dark"
      disabled={false}
      className="room"
      style={styles.room({
        number: "r" + props.number,
        focused: roomFocused,
        active: roomActive,
      })}
      onFocus={() => setRoomFocused(true)}
      onBlur={() => setRoomFocused(false)}
      onMouseEnter={() => setRoomActive(true)}
      onMouseLeave={() => setRoomActive(false)}
      onClick={selectRoom.bind(this)}
    >
      {props.type === "HQ" ? (
        <FontAwesomeIcon icon={faCrown} />
      ) : props.type === "armoury" ? (
        <FontAwesomeIcon icon={faShieldAlt} />
      ) : props.type === "loundry" ? (
        <FontAwesomeIcon icon={faShower} />
      ) : props.type === "stars" ? (
        <FontAwesomeIcon icon={faStar} />
      ) : (
        ""
      )}{" "}
      {props.number}
    </Button>
  );
};

export default SingleRoom;

const styles = {
  room: ({ number }) => ({
    textAlign: "center",
    fontSize: "10",
    border: `1px solid black`,
    gridArea: number,
  }),
};
