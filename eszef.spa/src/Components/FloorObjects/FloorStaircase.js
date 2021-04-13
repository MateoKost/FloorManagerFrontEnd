import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStream } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
} from "reactstrap";

const FloorStaircase = props => (

    <Button color="light"
      className="staircase"
      disabled={false}
      //style={{backgroundColor: colors[props.status]}}
    //   onClick={() => props.onClick(props.number, props.status)}
    
        style={{ 'gridArea': 's'+ props.number }}
    >
      <FontAwesomeIcon icon={faStream} />{" "}
      {props.number}

    </Button>
);

// // Color Theme
// const colors = {
//     available: 'lightgray',
//     used: 'lightgreen',
//     wrong: 'lightcoral',
//     candidate: 'deepskyblue',
// };

export default FloorStaircase;