import React from 'react';

const FloorStaircase = props => (

    <button
      className="staircase"
      //style={{backgroundColor: colors[props.status]}}
    //   onClick={() => props.onClick(props.number, props.status)}
    
        style={{ 'gridArea': 's'+ props.number }}
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

export default FloorStaircase;