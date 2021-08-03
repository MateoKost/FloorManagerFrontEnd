import React, {useState} from 'react';
import SingleRoom from './SingleRoom';
import FloorCorridor from './FloorCorridor';
import FloorStaircase from './FloorStaircase';

const FloorGrid = (props) => {
  const [roomActiveId, setRoomActiveId] = useState(0);

  function selectRoom ( roomId ) {
    // this.setState({
    //   selectedRoomId: ! roomId
    // });
    setRoomActiveId(roomId);
    props.selectRoom(roomId);
     
  };

  return (
<div className="floorGrid"
    // onClick={() => props.onClick.bind(this, 1)}
>
   
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
                
                // dede={setRoomActiveId}
                selectRoom={selectRoom}
                // onClick={() => props.onClick.bind(this, number)}
                // onClick={() => props.onClick(number)}
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


    {/* <h1>{roomActiveId}</h1> */}
</div>

)
    };
// // Color Theme
// const colors = {
//     available: 'lightgray',
//     used: 'lightgreen',

//     wrong: 'lightcoral',
//     candidate: 'deepskyblue',
// };

export default FloorGrid;