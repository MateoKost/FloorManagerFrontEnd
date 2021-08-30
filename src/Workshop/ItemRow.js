import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faChair,
  faHammer,
} from "@fortawesome/free-solid-svg-icons";
import itemIconNames from "../Utilities/IconNames";
import "../Utilities/table.css";
import { ItemsContext } from "../REST/Items";

export const ItemRow = (props) => {
  const { id, idRoom, itemName, isRepaired } = props.item;
  const icon = itemIconNames.find((item) => item.name === itemName);
  const { clientHandler, ACTIONS } = useContext(ItemsContext);
  const [cost, setCost] = useState(10.99);

  const handleSubmit = async () => {
    clientHandler({
      action: ACTIONS.REPAIR_ITEM,
      payload: { ...props.item, cost: cost },
    });
  };

  return (
    <tr key={id} style={{ backgroundColor: !isRepaired && "#FFF3DB" }}>
      <td>{id}</td>
      <td>{idRoom}</td>
      <td>
        {
          <span style={{ color: isRepaired === false ? "red" : "grey" }}>
            {icon ? icon.faIcon : <FontAwesomeIcon icon={faChair} />}
          </span>
        }
      </td>
      <td>{itemName}</td>
      <td>{cost}</td>
      <td>
        <Button
          disabled={isRepaired}
          color="warning"
          size="sm"
          className="mr-2"
          onClick={handleSubmit}
        >
          <FontAwesomeIcon icon={faHammer} />
        </Button>
      </td>
    </tr>
  );
};

export default ItemRow;
