import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faShieldAlt, faToilet, faStream, faCrown, faShower, faPhone
  } from '@fortawesome/free-solid-svg-icons'


const SingleRoom = (props) => {
    const [roomFocused, setRoomFocused] = useState(false);
    const [roomActive, setRoomActive] = useState(false);
    return (
      <button
        className="room"
        //style={{backgroundColor: colors[props.status]}}
      //   onClick={() => props.onClick(props.number, props.status)}
     
          style={styles.room({ number: 'r'+props.number, focused: roomFocused, active:roomActive })}
          onFocus = {() => setRoomFocused(true)}
          onBlur = {() => setRoomFocused(false)}
          onMouseEnter = {() => setRoomActive(true)}
          onMouseLeave = {() => setRoomActive(false)}
          >

        
        { props.type==="HQ" 
          ? <FontAwesomeIcon icon={faCrown} />
          : props.type==="armoury" ?  <FontAwesomeIcon icon={faShieldAlt} />
            : props.type==="loundry" ?  <FontAwesomeIcon icon={faShower} />
             : props.type==="stars" ?  <FontAwesomeIcon icon={faStar} />
               : ""
        } 
       
        {props.number}

        

      </button>
    )
};




// // Color Theme
// const colors = {
//     available: 'lightgray',
//     used: 'lightgreen',
//     wrong: 'lightcoral',
//     candidate: 'deepskyblue',
// };

export default SingleRoom;

const styles = {
  room: ({ number, focused, active }) =>  ({
    //backgroundColor: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: '10',
    backgroundColor: focused | active ? '#73462C' : '#A69C68',

    gridArea: number,
    /*width: 40px;
    height: 40px;
    float: left;*/
  }),
}