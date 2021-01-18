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
                type={ number===9 
                  ? "HQ" 
                  : number===8 
                    ? "armoury"
                    : number===22  || number===23
                      ? "loundry"
                      : number===10 || number===12
                         ? "stars"
                         : "none" 
                }
              />
            ))}
    {[...Array(3).keys()].map(number => (
              <FloorCorridor
                key={number}              
                number={number}
                type={ number===1
                  ? "duty" : "none" 
                }
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