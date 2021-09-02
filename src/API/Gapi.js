import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../REST/Authorization/Auth";
// import { client } from "./client";

export const GCalendarContext = React.createContext();

// const serverURL = "https://localhost:5001/create-checkout-session";

const ACTIONS = {
  ADD_EVENT :{

  }
  //   HANDLE_PAYMENT: {
  //     type: "handle-payment",
  //     endpoint: serverURL,
  //     method: "POST",
  //   },
};

export const GCalendarProvider = ({ children }) => {


  const [events, setEvents] = useState({ data: [], status: "pending" });

  const { currentUser, signInWithEmailAndPassword } = useContext(AuthContext);

  // const [eventList, setEventList] = useState([]);
  // let [eventList2, setEventList2] = useState([]);

  const gapi = window.gapi;

  const gapiConfig = {
    CLIENT_ID: process.env.REACT_APP_GAPI_CLIENT_ID,
    API_KEY: process.env.REACT_APP_GAPI_KEY,
    DISCOVERY_DOCS: [process.env.REACT_APP_GAPI_DOCS],
    SCOPES: process.env.REACT_APP_GAPI_SCOPES,
  };



  useEffect(() => {
    initGapi();
    // getEvents();
   
  }, [signInWithEmailAndPassword]);

  // useEffect(() => {
       
  //   getEvents();
  //   // getEvents();
   
  // }, [insertEvent]);

  function initGapi() {
    gapi.load("client:auth2", () => {
        gapi.client.init({
    apiKey: gapiConfig.API_KEY,
    clientId: gapiConfig.CLIENT_ID,
    discoveryDocs: gapiConfig.DISCOVERY_DOCS,
    scope: gapiConfig.SCOPES,
  });
      // gapi.client.load("calendar", "v3", () => console.log("bam!"));

      gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
       
        getEvents()
      })

    })

  }


  // function formatTheDate(date2) {
  //   let day = date2.toISOString().split("T")[0];
  //   let time = date2.toISOString().split("T")[1];
  //   let hour = time.split(":")[0] + ":" + time.split(":")[1];
  //   //  const day = date2.split('T')[0];
  //   // return ( day.toString() )
  //   return day + "T00:00:00-" + hour;
  // }

  // const addEvent = ({action, payload}) => {
  //   const { startDate, endDate } = payload;
  //   const eventStartTime = formatTheDate(startDate);
  //   const eventEndTime = formatTheDate(endDate);
  //   alert(eventStartTime)
  //   alert(eventEndTime)
  // }

  const getEvents = () => {


    alert("getevents")

    let days = new Date("2021-06-20");

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

        response.result.items.map(
          ({ created, end, summary, description }, i) => {
            let end2 = end.dateTime;
            ev = [
              ...ev,
              {
                i: i,
                created: created,
                end: end2,
                summary: summary,
                description: description,
              },
            ];
          }
        );
        
        // alert(ev)
        setEvents({ data: ev, status: "fulfilled" });
        // setEventList2(ev);
        //   console.log("EVENTS: ", events[1]);

        // console.log(ev);
      });
  }


/*
  const getEvents = () => {
    const handleClick = () => {
      gapi.load("client:auth2", () => {
        console.log("loaded client");

        let eventStartTime = formatTheDate(startDate);
        let eventEndTime = formatTheDate(endDate);



        gapi.auth2
          .getAuthInstance()
          .signIn()
          .then(() => {
            let event = {
              summary: summaryInput,

              description: descriptionInput,
              colorId: 1,
              start: {
                dateTime: "",
                timeZone: "Poland",
              },
              end: {
                dateTime: "",
                timeZone: "Poland",
              },
            };

            var request = gapi.client.calendar.events.insert({
              calendarId: "primary",
              resource: event,
            });

            request.execute((event) => {});

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

                response.result.items.map(
                  ({ created, end, summary, description }, i) => {
                    let end2 = end.dateTime;

                    ev = [
                      ...ev,
                      {
                        i: i,
                        created: created,
                        end: end2,
                        summary: summary,
                        description: description,
                      },
                    ];
                  }
                );

                setEventList2(ev);
                //   console.log("EVENTS: ", events[1]);

                console.log(eventList2);
              });


          });
      });
    };
  };




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

      // gapi.client.init({
      //   apiKey: gapiConfig.API_KEY,
      //   clientId: gapiConfig.CLIENT_ID,
      //   discoveryDocs: gapiConfig.DISCOVERY_DOCS,
      //   scope: gapiConfig.SCOPES,
      // });

      // gapi.client.load("calendar", "v3", () => console.log("bam!"));

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

              response.result.items.map(
                ({ created, end, summary, description }, i) => {
                  let end2 = end.dateTime;

                  ev = [
                    ...ev,
                    {
                      i: i,
                      created: created,
                      end: end2,
                      summary: summary,
                      description: description,
                    },
                  ];
                }
              );

              setEventList2(ev);
              //   console.log("EVENTS: ", events[1]);

              console.log(eventList2);
            });

        });
    });
  };

  */
  //   const { currentUser, updateDebt } = useContext(AuthContext);
  //   const [editPaymentData, setEditPaymentData] = useState({ id: "", cost: 0.0 });
  //   const [alertStatus, setAlertStatus] = useState({
  //     visibility: false,
  //     entity: "payment",
  //     type: "info",
  //   });

  function insertEvent({payload}){
    const {startDate,endDate,summary,description} = payload;
    try {
      let event = {
        summary: summary,  
        description: description,
        colorId: 1,
        start: {
          dateTime: startDate,
          timeZone: "Poland",
        },
        end: {
          dateTime: endDate,
          timeZone: "Poland",
        },
      };

      var request = gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      request.execute((event) => {
        window.open(event.htmlLink);
      });

      // getEvents();

    } 
    catch (err) {}
  }


  async function clientHandler({ action, payload }) {
    switch (action.type) {
      case ACTIONS.ADD_EVENT.type: {
        // const { endpoint, method } = ACTIONS.ADD_EVENT;
        insertEvent({payload:payload});
      // gapi.client.load("calendar", "v3", () => alert("bam"));
        break;
      }
      default:
        return null;
    }
  }

  return (
    <GCalendarContext.Provider
      value={{
        ACTIONS,
        clientHandler,
        events,
        // formatTheDate,

        // addEvent,
        // editPaymentData,
        // setEditPaymentData,
        // alertStatus,
      }}
    >
      {children}
    </GCalendarContext.Provider>
  );
};
