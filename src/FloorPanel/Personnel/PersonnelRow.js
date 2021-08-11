import React, {useContext} from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import "../../Utilities/table.css"
import { PersonnelContext } from '../../REST/Personnel';

export const PersonnelRow = (props) => {
  const { idSoldier, name, lastName, rank, idRoom } = props.personnel;
  const { setEditPersonnelModal,setEditPersonnelData, clientHandler, ACTIONS } = useContext(PersonnelContext);

  return (
    <tr key={idSoldier}>
    {/* <td>{rank}</td> */}
    <td>{name}</td>
    <td>{lastName}</td>
    <td>{idRoom}</td>

    <td>
      <Button
          color="info"
          size="sm"
          className="mr-2"
          outline
          onClick={()=>{setEditPersonnelData({idSoldier, name, lastName, rank, idRoom}); setEditPersonnelModal(true);}}
      >
        <FontAwesomeIcon icon={faPen} />
      </Button>
      <Button
          color="danger"
          size="sm"
          className="mr-2"
          outline
       onClick={  () => { clientHandler({ action: ACTIONS.DELETE_PERSONNEL, payload: {idSoldier: idSoldier } }); } }
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </td>
  </tr>
  );
};

export default PersonnelRow;
