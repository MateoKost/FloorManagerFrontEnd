import React, { useState } from 'react';

const SingleRoom = (props) => {
    const [roomFocused, setRoomFocused] = useState(false);
    return (
      <button
        className="room"
        //style={{backgroundColor: colors[props.status]}}
      //   onClick={() => props.onClick(props.number, props.status)}
     
          style={styles.room({ number: 'r'+props.number, focused: roomFocused})}
          onFocus = {() => setRoomFocused(true)}
          onBlur = {() => setRoomFocused(false)}
          onMouseEnter = {() => setRoomFocused(true)}
          onMouseLeave = {() => setRoomFocused(false)}
          >
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
  room: ({ number, focused }) =>  ({
    //backgroundColor: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: '10',
    backgroundColor: focused ? 'red' : 'blue',
    gridArea: number,
    /*width: 40px;
    height: 40px;
    float: left;*/
  }),
}