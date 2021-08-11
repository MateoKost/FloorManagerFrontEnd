import React, {useContext} from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faChair } from "@fortawesome/free-solid-svg-icons";
import itemIconNames from "./IconNames";
import "../../Utilities/table.css"
import { ItemsContext } from '../../REST/Items';

export const ItemRow = (props) => {
  const { id, idRoom, itemName, isRepaired } = props.item;
  const icon = itemIconNames.find((item) => item.name === itemName);

  const { setEditItemModal,
    setEditItemData, clientHandler, ACTIONS } = useContext(ItemsContext);

  return (
    <tr key={id} style={{ backgroundColor: !isRepaired && "#FFF3DB" }}>
      <td>{id}</td>
      <td>{idRoom}</td>
      <td>{itemName}</td>
      <td>
        {
          <span style={{ color: isRepaired === false ? "red" : "grey" }}>
            {icon ? icon.faIcon : <FontAwesomeIcon icon={faChair} />}
          </span>
        }
      </td>
      <td>
        <Button
          color="info"
          size="sm"
          className="mr-2"
          outline
          disabled={true}
          onClick={()=>{setEditItemData({id, idRoom, itemName}); setEditItemModal(true);}}
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <Button
          color="danger"
          size="sm"
          className="mr-2"
          outline
          onClick={  () => { clientHandler({ action: ACTIONS.DELETE_ITEM, payload: {id: id } }); } }
          // onClick={()=>props.onDelete.bind(this, {id, idRoom, itemName})}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  );
};

export default ItemRow;
