import React, { useContext } from "react";
import { UncontrolledAlert } from "reactstrap";

import { ItemsContext } from "../../REST/Items";
import { PersonnelContext } from "../../REST/Personnel";

export const AlertPanel = (props) => {
  // const { data, entity, type, visibility } = props;

  // const { items, setSelectedRoom: filterItems } = useContext(ItemsContext);
  const { editItemData, alertStatus:itemStatus } = useContext(ItemsContext);
  const { editPersonnelData, alertStatus:personnelStatus } = useContext(PersonnelContext);

  const pre = (type) => {
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
  };

  const alertData = (entity, alertData) => {
    switch (entity) {
      case "item":
        return ` przedmiot - ${ (alertData.id ? `[${alertData.id}] - ` : "") } ${alertData.itemName}`;
      case "soldier":
        return ` pracownika - ${alertData.rank} ${ (alertData.name ? alertData.name : "") } ${alertData.lastName}`;
      default:
        return "";
    }
  };

  return (
    <div className="col-12 p-12">
      {itemStatus.visibility && (
        <UncontrolledAlert color={itemStatus.type}>
          <span>
            {pre(itemStatus.type)} <b>{alertData(itemStatus.entity, editItemData)}</b> - pokój nr <b>{editItemData.idRoom}</b>
          </span>
        </UncontrolledAlert>
      )}
      {personnelStatus.visibility && (
        <UncontrolledAlert color={personnelStatus.type}>
          <span>
            {pre(personnelStatus.type)} <b>{alertData(personnelStatus.entity, editPersonnelData)}</b> - pokój nr <b>{editPersonnelData.idRoom}</b>
          </span>
        </UncontrolledAlert>
      )}
    </div>
  );
};
export default AlertPanel;
