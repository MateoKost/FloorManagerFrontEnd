import React from "react";
import "../../App.css";
import NewEvent from "./NewEvent";
import EventList from "./EventList";

function Calendar() {
  return (
    <div className="row  p-4">
      <EventList />
      <NewEvent />
    </div>
  );
}

export default Calendar;

{
  /*         
      <h1>{ formatTheDate( dateFrom ).toString() }</h1>
      <h1>{ dateFrom.toISOString().split('T')[0] }</h1>
      {/* <h1>{ dateFrom.toISOString().split('T')[1] }</h1> */
}
{
  /* <h1>{ "T01:00:00" }</h1>
      <h1>{ dateFrom.toISOString().split('T')[1].split(':')[0] }</h1>
      <h1>{ dateFrom.toISOString().split('T')[1].split(':')[1] }</h1> */
}
{
  /* <header>
          <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button>
        </header> */
}
