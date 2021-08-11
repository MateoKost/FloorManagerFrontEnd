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
        style={{ 'gridArea': 's'+ props.number }}
    >
      <FontAwesomeIcon icon={faStream} />{" "}
      {props.number}

    </Button>
);

export default FloorStaircase;