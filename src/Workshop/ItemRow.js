import React, {useContext, useState} from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faChair, faHammer } from "@fortawesome/free-solid-svg-icons";
import itemIconNames from "../Utilities/IconNames";
import "../Utilities/table.css"
import { ItemsContext } from '../REST/Items';

export const ItemRow = (props) => {
  const { id, idRoom, itemName, isRepaired } = props.item;
  const icon = itemIconNames.find((item) => item.name === itemName);

  const { setEditItemModal,setEditItemData, clientHandler, ACTIONS } = useContext(ItemsContext);

  const [cost, setCost] = useState(10.99);

  const handleSubmit = async () => {
    // event.preventDefault();
    // const { itemName, idRoom } = event.target.elements;
    // let params = {
    //   itemName: itemName.value,
    //   idRoom: parseInt(idRoom.value),
    // };

    clientHandler({ action: ACTIONS.REPAIR_ITEM, payload: {...props.item, cost:cost} });
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
//           id={id}
//           onClick={(e) => {
//             if (document.getElementById(id).disabled === false) {
//               const { cost } = this.state;
//               document.getElementById(id).disabled = true;
//               // this.setState({
//               //   cost: cost + 20.99,
//               // });
//               this.repair(id);
//               this.editUserCost(this.state.loggedInData.cost + 20.99);
//             }
//           }}
          disabled={isRepaired}
          color="warning"
          size="sm"
          className="mr-2"
          onClick={handleSubmit}
//           // onClick={this.setEditItemData.bind(this, id, idRoom, itemName)}
        >
           <FontAwesomeIcon icon={faHammer} />
        </Button>
      </td> 

        {/* <Button
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
          onClick={  () => { clientHandler({ action: ACTIONS.DELETE_ITEM, payload: { id: id, itemName: itemName, idRoom: idRoom } }); } }
          // onClick={()=>props.onDelete.bind(this, {id, idRoom, itemName})}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button> */}
      {/* </td> */}
    </tr>
  );
};

export default ItemRow;
