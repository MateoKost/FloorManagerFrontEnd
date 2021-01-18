import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStream } from '@fortawesome/free-solid-svg-icons'


const FloorStaircase = props => (

    <button
      className="staircase"
      //style={{backgroundColor: colors[props.status]}}
    //   onClick={() => props.onClick(props.number, props.status)}
    
        style={{ 'gridArea': 's'+ props.number }}
    >
      <FontAwesomeIcon icon={faStream} />
      {props.number}

    </button>
);

// // Color Theme
// const colors = {
//     available: 'lightgray',
//     used: 'lightgreen',
//     wrong: 'lightcoral',
//     candidate: 'deepskyblue',
// };

export default FloorStaircase;