import React, { Component, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
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
import axios from "axios";

import { Redirect, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faHammer,
  faCreditCard,
  faChair,
} from "@fortawesome/free-solid-svg-icons";

import itemIconNames from "./IconNames";

const stripePromise = loadStripe(
  "pk_test_51I9t89BhNjZNZazmTpkgwWIlp5b7jQpVBPJBQkq2Zy5nFEyMWbZG2Ix1IYmzvr9IgwScL4XDcmZmh8iDEK2OttsP00cCRPeNZZ"
);

class Workshop extends Component {
  constructor(props) {
    super(props);
    let token = "Bearer " + JSON.parse(localStorage.getItem("login")).store;

    this.state = {
      message: "",
      token: token,
      alertVisibility: true,
      alertColor: "",
      back: false,
      itemsToRepair: [],
      itemNames: itemIconNames,
      cost: 0.0,
      payed:false,
      loggedInData:{
        email: "",
        userName: "",
        lastName: "",
        company: "",
        cost: ""
      },
    };

    //this.renderIcon = this.renderIcon.bind(this);

  }


  getUserParams = async () => {

    let email = JSON.parse( localStorage.getItem( "login" )).loginData.email;

   // console.log( email )


    await axios
      .get(`https://localhost:5001/login/user/${email }`, {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("login")).store,
        },
      })
      .then((response) => {
       
        this.setState({
          loggedInData: {
            email: response.data.email,
            userName: response.data.userName,
            lastName: response.data.lastName,
            company: response.data.company,
            cost: response.data.cost
          }       
        });
        //console.log( this.state.loggedInData )
      });
  };



  toggleAlertVisibility() {
    this.setState({ alertVisibility: false });
  }

  componentDidMount() {
    this.getUserParams();
    this.getItems();
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      this.getUserParams().then(  e=>   this.editUserCostZero() );
     // this.editUserCost(0.00);
     
      //this.getUserParams();
      //this.getItems();
      this.setState({
        message: "Order placed! You will receive an email confirmation.",
        alertColor: "success",
        back: true,
        payed:true,
      });
      
    }

    if (query.get("canceled")) {
      this.setState({
        message: "Order cancelled!",
        alertColor: "warning",
        back: true,
        payed:false,
      });
    }
  }

  handleClick = async (event) => {
    //let token = "Bearer " + JSON.parse(localStorage.getItem("login")).store;

    const stripe = await stripePromise;

    //console.log(parseInt(this.state.loggedInData.cost));

    const response = await axios.post(
      `https://localhost:5001/create-checkout-session/${parseInt(this.state.loggedInData.cost*100)}`,
      this.state.cost,
      {
        headers: {
          Authorization: this.state.token,
        },
      }
    );

    //console.log(response.data.id);

    //const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    }).then(e=>{
      // this.editUserCost(0.00);
      // this.editUserCostZero();
    });

    //console.log(result);

    if (result.error) {
    }
  };


  repair = async (id) =>{

    
    await axios.put(
      `https://localhost:5001/item/${id}`, "",{
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("login")).store
        }
      }
    ).then((_) => this.getItems() )
  };



 editUserCost  = async ( singleCost ) => {

    const { loggedInData, cost } = this.state;

    let params2 = {
      email: loggedInData.email,
      userName: loggedInData.userName,
      lastName: loggedInData.lastName,
      company: parseInt(loggedInData.company),
      cost: parseFloat(singleCost)
    };

    //console.log(params2);

    await axios
      .put("https://localhost:5001/login/user/", params2, {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("login")).store,
        },
      })
      .then((_) => {
          this.getUserParams();
      //  localStorage.clear(); 
        // this.setState({
        //   dataChanged: true
        // })
      });
  };

  editUserCostZero  = async ( ) => {

    const { loggedInData, cost } = this.state;

    console.log(loggedInData);

    let params2 = {
      email: loggedInData.email,
      userName: loggedInData.userName,
      lastName: loggedInData.lastName,
      company: parseInt(loggedInData.company),
      cost: 0.00
    };

    console.log(params2);

    await axios
      .put("https://localhost:5001/login/user/", params2, {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("login")).store,
        },
      })
      .then((_) => {
          this.getUserParams();
      //  localStorage.clear(); 
        // this.setState({
        //   dataChanged: true
        // })
      });
  };



  add = () => {
    this.props.onButtonClick(this.input.value);
    this.input.value = "";
  }

  renderRow = ({ id, idRoom, itemName, isRepaired }) => (
    <tr key={id} style={{ backgroundColor: !isRepaired && "#FFF3DB" }}>
      <td>{id}</td>
      <td>{idRoom}</td>
      <td>{itemName}</td>
      <td>
        {this.state.itemNames.find((item) => item.name === itemName) ? (
          this.state.itemNames.find((item) => item.name === itemName).faIcon
        ) : (
          <FontAwesomeIcon icon={faChair} />
        )}
      </td>
      <td>{isRepaired ? "1" : "0"}</td>
      <td>20,99</td>
      <td>
        <Button
          id={id}
          onClick={(e) => {
            if (document.getElementById(id).disabled === false) {
              const { cost } = this.state;
              document.getElementById(id).disabled = true;
              // this.setState({
              //   cost: cost + 20.99,
              // });
              this.repair(id);
              this.editUserCost(this.state.loggedInData.cost+20.99);
            }
          }}
          disabled={isRepaired}
          color="warning"
          size="sm"
          className="mr-2"
          // onClick={this.setEditItemData.bind(this, id, idRoom, itemName)}
        >
          <FontAwesomeIcon icon={faHammer} />
        </Button>
      </td>
    </tr>
  );

  getItems = async () => {
    await axios
      .get("https://localhost:5001/item", {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((response) => {
        //  const items = ;
        this.setState({
          itemsToRepair: response.data.filter(
            (item) => item.isRepaired === false
          ), //itemsToRepair,
        });
      });
  };


  dudu = () => {
    this.getUserParams();
    this.editUserCostZero();
    this.getUserParams();
      return (<h1>001</h1>)
  };


  render() {
    return (
      <div>
        {/* { this.state.back && <Redirect to="/manage/workshop" />} */}

  {/* {this.state.payed && this.dudu } */}

        {this.state.message && (
          <Alert
            color={this.state.alertColor}
            isOpen={this.state.alertVisibility}
            toggle={this.toggleAlertVisibility.bind(this)}
          >
            {this.state.message}
          </Alert>
        )}
        <div className="row m-4">
          <div className="col-lg-7">
            <h2>Przedmioty do naprawy:</h2>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th> <th>Pomieszczenie</th> <th>Nazwa</th>{" "}
                  <th>Ikona</th>
                  <th>Stan</th> <th>Cena</th> <th>Akcje</th>
                </tr>
              </thead>
              <tbody>{this.state.itemsToRepair.map(this.renderRow)}</tbody>
            </Table>
          </div>

          <div className="col-lg-5">
            <Card>
              <div className="product">
                <FontAwesomeIcon icon={faCreditCard} className="fa-10x" />
              </div>
              <CardBody>
                <CardTitle tag="h2">Rachunek</CardTitle>
                <CardSubtitle tag="h3" className="mb-2 text-muted">
                  {parseFloat(this.state.loggedInData.cost).toFixed(2)} PLN{" "}
                </CardSubtitle>
                <Button
                  color="info"
                  style={{ minWidth: "150px" }}
                  onClick={this.handleClick}
                >
                  Zapłać
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Workshop;

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
