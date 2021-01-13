import React from 'react';
import SingleRoom from './SingleRoom';
import FloorCorridor from './FloorCorridor';
import FloorStaircase from './FloorStaircase';

const FloorGrid = () => (
<div className="floorGrid">
    {[...Array(24).keys()].map(number => (
              <SingleRoom
                key={number}              
                number={number}
              />
            ))}
    {[...Array(3).keys()].map(number => (
              <FloorCorridor
                key={number}              
                number={number}
              />
            ))}
    {[...Array(2).keys()].map(number => (
              <FloorStaircase
                key={number}              
                number={number}
              />
            ))}
</div>

);

// // Color Theme
// const colors = {
//     available: 'lightgray',
//     used: 'lightgreen',

//     wrong: 'lightcoral',
//     candidate: 'deepskyblue',
// };

export default FloorGrid;