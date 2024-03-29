import React, { useEffect, useState, useContext } from "react";

import "../Utilities/Spinner.css";

import { AuthContext } from "./Authorization/Auth";

import { client } from "./client";

export const PersonnelContext = React.createContext();

const serverURL = `https://localhost:5001`;

const ACTIONS = {
  CREATE_PERSONNEL: {
    type: "add-personnel",
    endpoint: serverURL + "/soldier",
    method: "POST",
  },
  READ_PERSONNEL: {
    type: "read-personnel",
    endpoint: serverURL + "/soldier",
    method: "GET",
  },
  UPDATE_PERSONNEL: { type: "edit-personnel", endpoint: serverURL + "/soldier", method:"PUT"},
  DELETE_PERSONNEL: { type: "delete-personnel", endpoint: serverURL + "/soldier", method:"DELETE" },
};

export const PersonnelProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const [personnel, setPersonnel] = useState({ data: [], status: "pending" });
  const [selectedRoom, setSelectedRoom] = useState("");
  const [newPersonnelModal, setNewPersonnelModal] = useState(false);
  const [editPersonnelModal, setEditPersonnelModal] = useState(false);
  const [editPersonnelData, setEditPersonnelData ] = useState({idSoldier:"", name:"", lastName:"", rank:"", idRoom:""});
  const [alertStatus, setAlertStatus ] = useState({visibility:false, entity: "soldier", type: "success"});

  useEffect(() => {
    clientHandler({action:ACTIONS.READ_PERSONNEL});
  }, [selectedRoom, alertStatus, currentUser]);

  async function clientHandler({action, payload}) {
    switch (action.type) {
      case ACTIONS.CREATE_PERSONNEL.type: {
        const { endpoint, method } = ACTIONS.CREATE_PERSONNEL;
        await client(endpoint, method, {body:payload}).then((result) => {
          console.log(result);
          setEditPersonnelData({ name:payload.name, lastName:payload.lastName, rank:payload.rank, idRoom:payload.idRoom })
          setAlertStatus({visibility:true, entity: "soldier", type: "success"})
        });
        break;
      }
      case ACTIONS.READ_PERSONNEL.type: {
        const { endpoint, method } = ACTIONS.READ_PERSONNEL;
        await client(endpoint, method).then((result) => {
            let filterData =  selectedRoom === '' ? result.data : result.data.filter( (employee) => employee.idRoom === selectedRoom )
            setPersonnel({ data: filterData, entity: "soldier", status: "fulfilled" });
        });
        break;
      }
      case ACTIONS.UPDATE_PERSONNEL.type: {
        const { endpoint, method } = ACTIONS.UPDATE_PERSONNEL;
        await client(endpoint, method, {body:payload}).then((result) => {
          console.log(result);
          setEditPersonnelData({ name:payload.name, lastName:payload.lastName, rank:payload.rank, idRoom:payload.idRoom })
          setAlertStatus({visibility:true, entity: "soldier", type: "info"})
          // window.location.reload();
        });
        break;
      }
      case ACTIONS.DELETE_PERSONNEL.type: {
        const { endpoint, method } = ACTIONS.DELETE_PERSONNEL;
        await client(endpoint+"/"+payload.idSoldier, method).then((result) => {
          console.log(result);
          setEditPersonnelData(payload)
          setAlertStatus({visibility:true, entity: "soldier", type: "warning"})
          // window.location.reload();
        });
        break;
      }
      default:
        return personnel;
    }
  }


  return (
    <PersonnelContext.Provider
      value={{
        ACTIONS,

        clientHandler,

        selectedRoom,
        setSelectedRoom,

        personnel,

        newPersonnelModal,
        setNewPersonnelModal,

        editPersonnelModal,
        setEditPersonnelModal,

        editPersonnelData,
        setEditPersonnelData,

        alertStatus
        
      }}
    >
      {children}
    </PersonnelContext.Provider>
  );
};
