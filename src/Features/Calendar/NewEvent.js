import React, { useState, useContext } from "react";

import { InputGroup, Form, CardBody, CardTitle } from "reactstrap";
import { Label, FormGroup, Input } from "reactstrap";
import { Card, Button } from "reactstrap";
import "../../App.css";
import { faPlus, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
// import DatePicker from "react-date-picker";
import DateTimePicker from "react-datetime-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GCalendarContext } from "../../API/Gapi";

export const NewEvent = () => {
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  // const [summaryInput, setSummaryInput] = useState("");
  // const [descriptionInput, setDescriptionInput] = useState("");

  const { gapi, clientHandler, ACTIONS } = useContext(GCalendarContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { startDate, startTime, endDate, endTime, summary, description } = event.target.elements;

    let params = {
      startDate: startDate.value + "T00:00:00-" + startTime.value,
      endDate: endDate.value + "T00:00:00-" + endTime.value,
      summary: summary.value,
      description: description.value
    };

    clientHandler({ action: ACTIONS.ADD_EVENT, payload: params });
  };

  return (
    <div className="col-lg-6 ">
      <Form onSubmit={handleSubmit}>
        <Card className="m-3">
          <CardBody>
            <CardTitle tag="h2">Nowe wydarzenie</CardTitle>
                  <FormGroup >
                  <Label >Data rozpoczęcia</Label>
                           <InputGroup>
                    <Input type="date" 
                    required
                    name="startDate"
                    id="startDate"
                    />
                    <Input type="time" 
                              required
                              name="startTime"
                              id="startTime"
                    
                    />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup >
                  <Label >Data zakończenia</Label>
                           <InputGroup>
                    <Input type="date" 
                    required
                    name="endDate"
                    id="endDate"
                    />
                    <Input type="time" 
                              required
                              name="endTime"
                              id="endTime"
                    
                    />
                    </InputGroup>
                  </FormGroup>

            <FormGroup>
              <Label for="summary">Podsumowanie</Label>
              <Input
                required
                type="text"
                name="summary"
                id="summary"
                placeholder="Podsumowanie"
              />
            </FormGroup>
            <FormGroup></FormGroup>
            <FormGroup>
              <Label for="description">Opis</Label>
              <Input
                // style={{ height: "12vh" }}
                required
                type="textarea"
                name="description"
                id="description"
                placeholder="Opis"
              />
            </FormGroup>
            <Button
              color="info"
              style={{ width: 150 }}
            >
              <FontAwesomeIcon icon={faPlus} /> Utwórz
            </Button>
          </CardBody>
        </Card>
      </Form>
    </div>
  );
};

export default NewEvent;
