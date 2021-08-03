import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPhone } from '@fortawesome/free-solid-svg-icons'

import {
  Button,
} from "reactstrap";

const FloorCorridor = (props) => {
  const [roomFocused, setRoomFocused] = useState(false);
  const [roomActive, setRoomActive] = useState(false);
  return (
    <Button color="light"
      className="corridor"
      //style={{backgroundColor: colors[props.status]}}
    //   onClick={() => props.onClick(props.number, props.status)}
    

    style={styles.room({ number: 'c'+props.number, focused: roomFocused, active:roomActive })}
    onFocus = {() => setRoomFocused(true)}
    onBlur = {() => setRoomFocused(false)}
    onMouseEnter = {() => setRoomActive(true)}
    onMouseLeave = {() => setRoomActive(false)}

        // style={{ 'gridArea': 'c'+ props.number }}
    >
      
      { props.type==="duty" 
          ? <span style={{ color: "red" }}> <FontAwesomeIcon  icon={faPhone} /> </span>
            : ""
        } 
{" "}
      {props.number}
    </Button>
)
};

// // Color Theme
// const colors = {
//     available: 'lightgray',
//     used: 'lightgreen',
//     wrong: 'lightcoral',
//     candidate: 'deepskyblue',
// };

export default FloorCorridor;


const styles = {
  room: ({ number, focused, active }) =>  ({
    //backgroundColor: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: '10',

  
    // backgroundColor: focused | active ? '#FEFFDB' : "#E6E6E6",

    gridArea: number,
    /*width: 40px;
    height: 40px;
    float: left;*/
  }),
}