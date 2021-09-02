import React, { useEffect, useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "./Authorization/Auth";
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
  const [editPaymentData, setEditPaymentData] = useState({ id: "", cost: 0.0 });
  const [alertStatus, setAlertStatus] = useState({
    visibility: false,
    entity: "payment",
    type: "info",
  });

  
  async function clientHandler({ action, payload }) {
    switch (action.type) {
      case ACTIONS.HANDLE_PAYMENT.type: {
        const { endpoint, method } = ACTIONS.HANDLE_PAYMENT;

        let resultId;
        let stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PROMISE);

        await client(endpoint + "/" + parseInt(payload.cost * 100), method, {
          body: payload.cost,
        })
          .then((result) => {
            resultId = result.data.id;
            setEditPaymentData({ id: result.data.id, cost: payload.cost });
          })
          .then(() => {
            let outcome;
            try {
              stripePromise
                .redirectToCheckout({
                  sessionId: resultId,
                })
            } catch (err) {
              setAlertStatus({
                type: "danger",
                visibility: true,
              });
            }
          });
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
