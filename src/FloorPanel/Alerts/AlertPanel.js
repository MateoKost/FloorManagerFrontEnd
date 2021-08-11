import React, {useContext} from "react";
import { UncontrolledAlert } from "reactstrap";

import { ItemsContext } from "../../REST/Items";
import { PersonnelContext } from "../../REST/Personnel";

export const AlertPanel = (props) => {
  const { data, entity, type, visibility } = props;

  // const { items, setSelectedRoom: filterItems } = useContext(ItemsContext);
  // const { editPersonnelData, alertStatus } = useContext(PersonnelContext);

  const pre = (() => {
    switch (type) {
      case "success":
        return "Dodano";
      case "info":
        return "Przeniesiono";
      case "warning":
        return "Usunięto";
      default:
        return "";
    }
  })();

  const alertData = (() => {
    switch (entity) {
      case "item":
        return `${data.itemName}`;
      case "soldier":
        return `${data.rank} ${data.name} ${data.lastName}`;
      default:
        return "";
    }
  })();

  return (
    <div>
      {visibility && (
        <UncontrolledAlert color={type}>
           <span>
                {pre} <b>{alertData}</b> - pokój nr <b>{data.idRoom}</b>
          </span>
        </UncontrolledAlert>
      )}
            {visibility && (
        <UncontrolledAlert color={type}>
           <span>
                {pre} <b>{alertData}</b> - pokój nr <b>{data.idRoom}</b>
          </span>
        </UncontrolledAlert>
      )}
    </div>
  );
};
export default AlertPanel;
