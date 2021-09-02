import React, { useState, useContext } from "react";
import { CardText, CardBody, CardTitle } from "reactstrap";
import { Label, FormGroup, Input } from "reactstrap";
import { Card, Button } from "reactstrap";
import "../../App.css";
import { faPlus, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
// import DatePicker from "react-date-picker";
import DateTimePicker from "react-datetime-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Event = (props) => {
  const { i, created, end, description, summary } = props.event;

  return (
    <section key={i}>
      <Card className="m-3 p-3">
        <div className="product">
          <FontAwesomeIcon
            className="fa-3x"
            icon={faCalendarDay}
          ></FontAwesomeIcon>
        </div>
        <CardBody>
          <CardTitle tag="h4">{summary}</CardTitle>
          <CardTitle tag="h6">
            {end.split("T")[0]} {end.split("T")[1].split("+")[0]}
          </CardTitle>
          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    </section>
  );
};

export default Event;
