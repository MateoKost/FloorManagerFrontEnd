import React, { useEffect, useState, useContext, useReducer } from "react";

import SpinnerGroup from "../Utilities/SpinnerGroup";
import "../Utilities/Spinner.css";

import { AuthContext } from "../Authorization/Auth";

import { client } from "./client";

export const ItemsContext = React.createContext();

const serverURL = `https://localhost:5001`;

const ACTIONS = {
  CREATE_ITEM: {
    type: "add-item",
    endpoint: serverURL + "/item",
    method: "POST",
  },
  READ_ITEMS: {
    type: "read-item",
    endpoint: serverURL + "/item",
    method: "GET",
  },
  UPDATE_ITEM: { type: "edit-item", endpoint: serverURL + "/item", method:"PUT"},
  DELETE_ITEM: { type: "delete-tem", endpoint: serverURL + "/item",  method:"DELETE"  },
};

export const ItemsProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // const [items, dispatch ] = useReducer(reducer, {data:[], pending: true})
  const [items, setitems] = useState({ data: [], status: "pending" });
  const [selectedRoom, setSelectedRoom] = useState("");
  const [newItemModal, setNewItemModal] = useState(false);
  const [editItemModal, setEditItemModal] = useState(false);
  const [ editItemData, setEditItemData ] = useState({id:"", idRoom:"", itemName:""});

  useEffect(() => {
    clientHandler({action:ACTIONS.READ_ITEMS});
  }, []);

  async function clientHandler({action, payload}) {
    switch (action.type) {
      case ACTIONS.CREATE_ITEM.type: {
        const { endpoint, method } = ACTIONS.CREATE_ITEM;
        await client(endpoint, method, {body:payload}).then((result) => {
          console.log(result);
          window.location.reload();
        });
        break;
      }
      case ACTIONS.READ_ITEMS.type: {
        const { endpoint, method } = ACTIONS.READ_ITEMS;
        await client(endpoint, method).then((result) => {
          setitems({ data: result.data, status: "fulfilled" });
        });
        break;
      }
      case ACTIONS.UPDATE_ITEM.type: {
        const { endpoint, method } = ACTIONS.UPDATE_ITEM;
        await client(endpoint, method, {body:payload}).then((result) => {
          console.log(result);
          // setitems({ data: result.data, status: "fulfilled" });
          window.location.reload();
        });
        break;
      }
      case ACTIONS.DELETE_ITEM.type: {
        const { endpoint, method } = ACTIONS.DELETE_ITEM;
        await client(endpoint+"/"+payload.id, method).then((result) => {
          console.log(result);
          window.location.reload();
        });
        break;
      }
      default:
        return items;
    }
  }


  return (
    <ItemsContext.Provider
      value={{
        ACTIONS,
        items,
        clientHandler,

        selectedRoom,
        setSelectedRoom,

        newItemModal,
        setNewItemModal,

        editItemModal, editItemData, setEditItemModal,
        setEditItemData

      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};


// editItem = async (editItemData) => {
//   const { items } = this.state;
//   await axios.put(`https://localhost:5001/${editItemData.idRoom}/${editItemData.id}`, "", {
//     headers: {
//       Authorization: this.state.token,
//     }

//   }).then(e=>{
//     this.setState({
//       editItemModal: false,
//       items,
//       editItemData: {
//         id: "",
//         idRoom: "",
//         itemName: "",
//       },
//     });
//     this.getItems();
//   })
// };