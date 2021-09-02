import React, { useState, useContext } from "react";
import { CardBody, CardTitle } from "reactstrap";
import { Label, FormGroup, Input } from "reactstrap";
import { Card, Button } from "reactstrap";
import "../../App.css";
import { faPlus, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
// import DatePicker from "react-date-picker";
import DateTimePicker from "react-datetime-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GCalendarContext } from "../../API/Gapi";

import SpinnerGroup from "../../Utilities/SpinnerGroup";
import "../../Utilities/Spinner.css";

import Event from "./Event";

export const EventList = () => {
  const { events, clientHandler, ACTIONS } = useContext(GCalendarContext);

  let content;
  if (events.status === "pending") {
    console.log("pending");
    content = <SpinnerGroup />;
  } else if (events.status === "fulfilled") {
    console.log("fulfilled");
    content =
      events.data && events.data.map((event) => <Event event={event} />);
  } else if (events.status === "failed") {
    content = <div>error!!!</div>;
  }

  return (
    <div className="col-lg-6 ">
      Historia
      {content}
    </div>
  );
};

export default EventList;
