import React from 'react';

const FloorCorridor = props => (

    <button
      className="corridor"
      //style={{backgroundColor: colors[props.status]}}
    //   onClick={() => props.onClick(props.number, props.status)}
    
        style={{ 'gridArea': 'c'+ props.number }}
    >
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

export default FloorCorridor;