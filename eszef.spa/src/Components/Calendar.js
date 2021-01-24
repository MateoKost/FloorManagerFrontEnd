
import React from 'react';
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
import { Card,
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText
} from 'reactstrap';
import '../App.css';
import { useHistory } from "react-router-dom";
import eszef from "../Assets/Eszef.png";


import GoogleExcel from "./GoogleExcel";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
faCalendarAlt

} from "@fortawesome/free-solid-svg-icons";


function Calendar() {

    var gapi = window.gapi
    /* 
      Update with your own Client Id and Api key 
    */
    var CLIENT_ID = "397984931999-a57rkjpnivmdae6pps80o7nhknjasuhm.apps.googleusercontent.com"
    var API_KEY = "AIzaSyCtzSNzxZBIZWH-uRc3WZJ3ez1OK5QcBpg"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"
  
    const handleClick = () => {
      gapi.load('client:auth2', () => {
        console.log('loaded client')
  
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('bam!'))
  
        gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          
          var event = {
            'summary': 'Awesome Event!',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'Really great refreshments',
            'start': {
              'dateTime': '2021-01-28T09:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'end': {
              'dateTime': '2021-01-28T17:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
              {'email': 'lpage@example.com'},
              {'email': 'sbrin@example.com'}
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }
  
          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
          })
  
          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })
          
  
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
      
  
        })
      })
    }
  
  
    return (


     

      <div >
        <header>
          <button style={{width: 100, height: 50}} onClick={handleClick}>Add Event</button>
        </header>


        <Card className="m-3">
                <CardBody >
                  <CardTitle tag="h2">Nowe wydarzenie</CardTitle>
                  <FormGroup>
                    <Label for="itemName">Data1</Label>
                    <Input
                      required
                      type="email"
                      name="itemName"
                      id="itemName"
                      placeholder="E-mail"
        
                      value={ JSON.parse(localStorage.getItem( "login" )).loginData.email } 
                      onChange={(e) => {
                     //   editUserData.email = e.target.value;
                     //   this.setState({ editUserData });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label for="itemName">Data2</Label>
                    <Input
                      required
                      type="email"
                      name="itemName"
                      id="itemName"
                      placeholder="E-mail"
     
                      value={ JSON.parse(localStorage.getItem( "login" )).loginData.email } 
                      onChange={(e) => {
                     //   editUserData.email = e.target.value;
                     //   this.setState({ editUserData });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                  <Label for="itemName">Notka</Label>
                    <Input
                      required
                      type="email"
                      name="itemName"
                      id="itemName"
                      placeholder="E-mail"
       
                      value={ JSON.parse(localStorage.getItem( "login" )).loginData.email } 
                      onChange={(e) => {
                     //   editUserData.email = e.target.value;
                     //   this.setState({ editUserData });
                      }}
                    />
                  </FormGroup>
                  </CardBody>
          </Card>


      </div>
    );
  }
  
  export default Calendar;