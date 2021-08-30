import React, { useEffect, useState, useContext, useReducer } from "react";

// import SpinnerGroup from "../Utilities/SpinnerGroup";
import "../Utilities/Spinner.css";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../Authorization/Auth";

import { client } from "./client";

export const PaymentContext = React.createContext();

const serverURL = "https://localhost:5001/create-checkout-session";

const ACTIONS = {
  HANDLE_PAYMENT: {
    type: "handle-payment",
    endpoint: serverURL,
    method: "POST",
  },
};

export const PaymentProvider = ({ children }) => {
  const { currentUser, updateDebt } = useContext(AuthContext);

  // const [items, dispatch ] = useReducer(reducer, {data:[], pending: true})
  // const [items, setitems] = useState({ data: [], status: "pending" });
  // const [selectedRoom, setSelectedRoom] = useState("");
  // const [newItemModal, setNewItemModal] = useState(false);
  // const [editItemModal, setEditItemModal] = useState(false);
  const [editPaymentData, setEditPaymentData] = useState({ id: "", cost: 0.0 });
  const [alertStatus, setAlertStatus] = useState({
    visibility: false,
    entity: "item",
    type: "success",
  });

  // useEffect(() => {
  //   clientHandler({action:ACTIONS.READ_ITEMS});
  // }, [selectedRoom, alertStatus, currentUser]);

  async function clientHandler({ action, payload }) {
    switch (action.type) {
      case ACTIONS.HANDLE_PAYMENT.type: {
        const { endpoint, method } = ACTIONS.HANDLE_PAYMENT;
        // alert(payload.cost);
        // alert(method);
        // alert(endpoint + "/" + payload.cost)

        let resultId;
        let stripePromise = await loadStripe(
          "pk_test_51I9t89BhNjZNZazmTpkgwWIlp5b7jQpVBPJBQkq2Zy5nFEyMWbZG2Ix1IYmzvr9IgwScL4XDcmZmh8iDEK2OttsP00cCRPeNZZ"
        );

        await client(endpoint + "/" + parseInt(payload.cost * 100), method, {
          body: payload.cost,
        })
          .then((result) => {
            // updateDebt(payload.cost)

            resultId = result.data.id;
            // alert(result.data.id);
            setEditPaymentData({ id: result.data.id, cost: payload.cost });
          })
          .then(() => {
            try {
              // outcome =
              stripePromise
                .redirectToCheckout({
                  sessionId: resultId,
                })
                .then(() => {
                  updateDebt(0);
                  setAlertStatus({
                    type: "success",
                  });
                });
            } catch (err) {
              setAlertStatus({
                type: "danger",
              });
            }
            
          });

        // let outcome;

        // await  payload.stripePromise.redirectToCheckout({
        //         sessionId: resultId,
        //       }).then(()=>{
        //         updateDebt(0);
        //         alert("success")
        //         setAlertStatus({
        //           type: "success",
        //         });
        //       });
        // try {
        //   // outcome =
        //   payload.stripePromise.redirectToCheckout({
        //     sessionId: result.data.id,
        //   }).then(()=>{
        //     updateDebt(0);
        //     setAlertStatus({
        //       type: "success",
        //     });
        //   });
        // } catch (err) {
        //   setAlertStatus({
        //     type: "danger",
        //   });
        // }

        // if (outcome) {
        //   updateDebt(0);
        //   setAlertStatus({
        //     type: "success",
        //   });
        // }

        setAlertStatus({
          visibility: true,
          entity: "payment",
        });

        //console.log(result);

        // if (result.error) {
        // }
        // });
        break;
      }
      default:
        return null;
    }
  }

  return (
    <PaymentContext.Provider
      value={{
        ACTIONS,
        clientHandler,
        editPaymentData,
        setEditPaymentData,
        alertStatus,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
