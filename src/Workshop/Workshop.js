import React, { useContext } from "react";
import {
  Alert,
  Table,
  Button,
  Navbar,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faHammer,
  faCreditCard,
  faChair,
} from "@fortawesome/free-solid-svg-icons";
import SpinnerGroup from "../Utilities/SpinnerGroup";
import "../Utilities/Spinner.css";

import { ItemsContext } from "../REST/Items";
import { AuthContext } from "../Authorization/Auth";
import { PaymentContext } from "../REST/Payment";
import AlertPanel from "./AlertPanel";
import ItemRow from "./ItemRow";

const Workshop = () => {
  const { items } = useContext(ItemsContext);
  const { currentUserData } = useContext(AuthContext);
  const { clientHandler, ACTIONS } = useContext(PaymentContext);

  const handleSubmit = async () => {
    let params = {
      cost: currentUserData.cost,
    };
    clientHandler({ action: ACTIONS.HANDLE_PAYMENT, payload: params });
  };

  let content;
  if (items.status === "pending") {
    console.log("pending");
    content = <SpinnerGroup />;
  } else if (items.status === "fulfilled") {
    console.log("fulfilled");
    content =
      items.data &&
      items.data
        .filter((item) => item.isRepaired === false)
        .map((item) => <ItemRow item={item} />);
  } else if (items.status === "failed") {
    content = <div>error!!!</div>;
  }

  return (
    <div>
      <AlertPanel />
      <div className="row m-4">
        <div className="col-lg-7">
          <h2>Przedmioty do naprawy:</h2>
          <Table striped>
            <thead>
              <tr>
                <th>#</th> <th>Pomieszczenie</th> <th></th> <th>Nazwa</th>
                <th>Cena</th> <th>Akcje</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </Table>
        </div>

        <div className="col-lg-5">
          <Card>
            <div className="product gridCenter">
              <FontAwesomeIcon icon={faCreditCard} className="fa-10x" />
            </div>
            <CardBody className="text-center">
              <CardTitle tag="h2">Rachunek</CardTitle>
              <CardSubtitle tag="h3" className="mb-2 text-muted">
                {currentUserData.cost} PLN
              </CardSubtitle>
              <Button color="info" className="col-lg-12" onClick={handleSubmit}>
                Zapłać
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
