import React, { useContext } from "react";
import { UncontrolledAlert } from "reactstrap";

import { PaymentContext } from "../REST/Payment";


export const AlertPanel = (props) => {

  const { editPaymentData, alertStatus } = useContext(PaymentContext);

  const pre = (type) => {
    switch (type) {
      case "success":
        return "Transakcja zakończona pomyślnie!";
      case "warning":
        return "Transakcja odrzucona!";
      default:
        return "";
    }
  };

  return (
    <div className="col-12 p-12">
      {alertStatus.visibility && (
        <UncontrolledAlert color={alertStatus.type}>
          <span>
            {pre(alertStatus.type)} 
          </span>
        </UncontrolledAlert>
      )}
    </div>
  );
};
export default AlertPanel;
