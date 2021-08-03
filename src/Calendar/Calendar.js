import React, { useState, useEffect } from "react";
//import gapi from 'gapi';
import {
  Alert,
  Table,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import axios from "axios";
import { Label, FormGroup, Input } from "reactstrap";
import {
  Card,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import "../App.css";
import { useHistory } from "react-router-dom";
// import eszef from "../Assets/Eszef.png";

import { faPlus,faCalendarDay } from "@fortawesome/free-solid-svg-icons";

import GoogleExcel from "../GoogleSheets/GoogleExcel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import DatePicker from "react-date-picker";
import DateTimePicker from "react-datetime-picker";

function Calendar() {
  var gapi = window.gapi;
  /* 
      Update with your own Client Id and Api key 
    */
  var CLIENT_ID =
    "397984931999-a57rkjpnivmdae6pps80o7nhknjasuhm.apps.googleusercontent.com";
  var API_KEY = "AIzaSyCtzSNzxZBIZWH-uRc3WZJ3ez1OK5QcBpg";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";



  useEffect(() => {
    getEvents();
  }, []);

const getEvents = () => {
   const handleClick = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      let eventStartTime = formatTheDate(startDate);
      let eventEndTime = formatTheDate(endDate);

      // let eventStartTime = new Date()
      // eventStartTime.setDate(eventStartTime.getDay() + 1)

      // // Create a new event end date instance for temp uses in our calendar.
      // let eventEndTime = new Date()
      // eventEndTime.setDate(eventEndTime.getDay() + 2)
      // eventEndTime.setMinutes(eventEndTime.getMinutes() + 22)

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          let event = {
            summary: summaryInput,

            description: descriptionInput,
            colorId: 1,
            start: {
              dateTime: '',
              timeZone: "Poland",
            },
            end: {
              dateTime: '',
              timeZone: "Poland",
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {

          });


          
          let days = new Date("2021-01-20");

          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: days.toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 100,
              orderBy: "startTime",
            })
            .then((response) => {
              const events = response.result.items;
              
              let ev = [];

              console.log("EVENTS: ", events[1]);

              response.result.items.map( ( {created, end, summary, description }, i) => {
                let end2 = end.dateTime;

                 ev=[ ...ev, { i:i, created: created, end:end2, summary:summary, description:description }]  
              })


              setEventList2(ev);
        //   console.log("EVENTS: ", events[1]);



              console.log(eventList2);
            });

          /*
              Uncomment the following block to get events
          */
          /*
          // get events
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }).then(response => {
            const events = response.result.items
            console.log('EVENTS: ', events)
          })
          */
        });
    });
  };


}



  const handleClick = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      let eventStartTime = formatTheDate(startDate);
      let eventEndTime = formatTheDate(endDate);

      // let eventStartTime = new Date()
      // eventStartTime.setDate(eventStartTime.getDay() + 1)

      // // Create a new event end date instance for temp uses in our calendar.
      // let eventEndTime = new Date()
      // eventEndTime.setDate(eventEndTime.getDay() + 2)
      // eventEndTime.setMinutes(eventEndTime.getMinutes() + 22)

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          let event = {
            summary: summaryInput,

            description: descriptionInput,
            colorId: 1,
            start: {
              dateTime: eventStartTime,
              timeZone: "Poland",
            },
            end: {
              dateTime: eventEndTime,
              timeZone: "Poland",
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            // console.log(event);
            window.open(event.htmlLink);
          });


          
          let days = new Date("2021-01-20");

          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: days.toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 100,
              orderBy: "startTime",
            })
            .then((response) => {
              const events = response.result.items;
              
              let ev = [];

              console.log("EVENTS: ", events[1]);

              response.result.items.map( ( {created, end, summary, description }, i) => {
                let end2 = end.dateTime;

                 ev=[ ...ev, { i:i, created: created, end:end2, summary:summary, description:description }]  
              })


              setEventList2(ev);
        //   console.log("EVENTS: ", events[1]);



              console.log(eventList2);
            });

          /*
              Uncomment the following block to get events
          */
          /*
          // get events
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }).then(response => {
            const events = response.result.items
            console.log('EVENTS: ', events)
          })
          */
        });
    });
  };





  function formatTheDate(date2) {
    let day = date2.toISOString().split("T")[0];
    let time = date2.toISOString().split("T")[1];
    let hour = time.split(":")[0] + ":" + time.split(":")[1];
    //  const day = date2.split('T')[0];
    // return ( day.toString() )
    return day + "T00:00:00-" + hour;
  }

  //const [dateFrom, setDateFrom] = useState(new Date());
  //const [dateFrom2, setDateFrom2] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [summaryInput, setSummaryInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [eventList, setEventList] = useState([]);
  let [eventList2, setEventList2] = useState([]);





  return (
    <div className="row  p-4">
      {/*         
      <h1>{ formatTheDate( dateFrom ).toString() }</h1>
      <h1>{ dateFrom.toISOString().split('T')[0] }</h1>
      {/* <h1>{ dateFrom.toISOString().split('T')[1] }</h1> */}
      {/* <h1>{ "T01:00:00" }</h1>
      <h1>{ dateFrom.toISOString().split('T')[1].split(':')[0] }</h1>
      <h1>{ dateFrom.toISOString().split('T')[1].split(':')[1] }</h1> */}
      {/* <header>
          <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button>
        </header> */}
      <div className="col-lg-6 ">Historia

    



      {   eventList2.map(( {i, created, end, description, summary} ) => 

        // <li >{summary} {end} </li>

        <section key={i}>


<Card className="m-3 p-3">
{/* <CardImg><FontAwesomeIcon icon={faCalendarDay} ></FontAwesomeIcon> </CardImg> */}
<div className="product">
<FontAwesomeIcon  className="fa-3x" icon={faCalendarDay} ></FontAwesomeIcon>
              </div>
          <CardBody>
      
            <CardTitle tag="h4">{summary}</CardTitle>
            <CardTitle tag="h6">{end.split('T')[0]} {end.split('T')[1].split('+')[0]}</CardTitle>
            <CardText>{description}</CardText>
            </CardBody>
            </Card >

          <div>

{/* {i} */}

</div>
          </section>





        // <li key={i}> 
          
        //    {  created } {description} 
           
           
        //    </li>

      )}

</div>
      <div className="col-lg-6 ">
        <Card className="m-3">
          <CardBody>
            <CardTitle tag="h2">Nowe wydarzenie</CardTitle>

            <div className="row">
              <div className="col-lg-6 ">
                <FormGroup>
                  <Label for="itemName">Data rozpoczęcia</Label>
                  <div>
                    <DateTimePicker onChange={setStartDate} value={startDate} />
                  </div>
                </FormGroup>
              </div>
              <div className="col-lg-6 ">
                <FormGroup>
                  <Label for="endDate">Data zakończenia</Label>
                  <div>
                    <DateTimePicker
                      name="endDate"
                      id="endDate"
                      onChange={setEndDate}
                      value={endDate}
                    />
                  </div>
                </FormGroup>
              </div>
            </div>

            {/* <DatePicker
                    onChange={setDateFrom}
                    value={dateFrom}
                  /> */}
            <FormGroup>
              <Label for="itemName">Podsumowanie</Label>
              <Input
                required
                type="text"
                name="summary"
                id="summary"
                placeholder="Podsumowanie"
                value={summaryInput}
                //   onChange={setSummaryInput(value)}

                onChange={(e) => {
                  setSummaryInput(e.target.value);
                  // this.setState({ summaryText });
                }}
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
                value={descriptionInput}
                onChange={(e) => {
                  setDescriptionInput(e.target.value);
                }}
              />
            </FormGroup>
            <Button color="info" style={{ width: 150 }} onClick={handleClick}>
              <FontAwesomeIcon icon={faPlus} /> Utwórz
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Calendar;
