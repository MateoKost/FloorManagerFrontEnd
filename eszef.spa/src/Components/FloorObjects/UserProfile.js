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

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import { Redirect, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faHammer,
  faCreditCard,
  faChair,
  faTired,
} from "@fortawesome/free-solid-svg-icons";
import { Label, FormGroup, Input } from "reactstrap";
import classnames from "classnames";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    const loginData2 = JSON.parse(localStorage.getItem( "login" )).loginData;

    let token = "Bearer " + JSON.parse(localStorage.getItem("login")).store;
    this.state = {
      toke: token,
      activeTab: "1",
      editUserData: {
        email: "",
        userName: "",
        lastName: "",
        company: "",
        cost: ""
 
      },
      loggedInData:{
        email: "",
        userName: "",
        lastName: "",
        company: "",
        cost: ""
 
      },

      loginData:{
        email: loginData2.email,
        password: loginData2.password,
      },
      dataChanged:false,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  toggleAlertVisibility() {
    // this.setState({ alertVisibility: false })
  }


  

  editUser  = async () => {

    const { editUserData } =this.state;

    let params2 = {
      email: editUserData.email,
      userName: editUserData.userName,
      lastName: editUserData.lastName,
      company: parseInt(editUserData.company),
      cost: parseFloat(editUserData.cost)
    };

    console.log(params2);

    axios
      .put("https://localhost:5001/login/user/", params2, {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("login")).store,
        },
      })
      .then((_) => {

          console.log(_);

      //  localStorage.clear(); 
        // this.setState({
        //   dataChanged: true
        // })
      });
  };


  getUserParams = async () => {

    let email = JSON.parse( localStorage.getItem( "login" )).loginData.email;

    //console.log( email )


    await axios
      .get(`https://localhost:5001/login/user/${email }`, {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("login")).store,
        },
      })
      .then((response) => {
        //console.log( response.data.find( (item) => item.isRepaired === false ));
        //const itemsToRepair2 = response.data.find( (item) => item.isRepaired === false );

     // console.log( response.data.lastName )

       
        this.setState({
          loggedInData: {
            email: response.data.email,
            userName: response.data.userName,
            lastName: response.data.lastName,
            company: response.data.company,
            cost: response.data.cost
          },
          editUserData: {
            email: response.data.email,
            userName: response.data.userName,
            lastName: response.data.lastName,
            company: response.data.company,
            cost: response.data.cost
          }
            
        });


        console.log( this.state.loggedInData )
      });
  };

  componentDidMount() {
    this.getUserParams();
  }

  render() {
    const { editUserData, dataChanged, loginData, loggedInData } = this.state;

    return (
 
      <Row>
         { dataChanged && <Redirect from="/" to="/manage/floor" />}
        <Col xs="6" sm="4" md="4" className="bg-light p-4">
          <Nav tabs vertical pills className="bg-light  p-4 ">
            <NavItem>
              <NavLink
                className={classnames(
                  { active: this.state.activeTab === "1" },
                  "bg-dark m-1"
                )}
                style={{ color: "white", width: "10wh", border: 0 }}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Dane podstawowe
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  { active: this.state.activeTab === "2" },
                  "bg-dark m-1"
                )}
                style={{ color: "white" }}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Ustawienia
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  { active: this.state.activeTab === "3" },
                  "bg-dark m-1"
                )}
                style={{ color: "white" }}
                onClick={() => {
                  this.toggle("3");
                }}
              >
                Historia transakcji
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  { active: this.state.activeTab === "4" },
                  "bg-dark m-1"
                )}
                style={{ color: "white" }}
                onClick={() => {
                  this.toggle("4");
                }}
              >
                Usunięcie konta
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col xs="6" sm="6" md="6">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1" >
              <Card className="m-3">
                <CardBody>
                  <CardTitle tag="h2">Podaj nowe dane</CardTitle>
                  <FormGroup>
                    <Label for="itemName">E-mail</Label>
                    <Input
                      required
                      type="email"
                      name="itemName"
                      id="itemName"
                      placeholder="E-mail"
                      disabled
                      value={ JSON.parse(localStorage.getItem( "login" )).loginData.email } 
                      onChange={(e) => {
                        editUserData.email = e.target.value;
                        this.setState({ editUserData });
                      }}
                    />
                  </FormGroup>

                  <FormGroup >
                    <Label for="itemName">Hasło</Label>
                    <Input
                      required
                      disabled
                      type="password"
                      name="itemName"
                      id="itemName"
                      placeholder="Hasło"
                      value={ JSON.parse(localStorage.getItem( "login" )).loginData.password } 
                    />
                  </FormGroup>


                  <FormGroup>
                    <Label for="itemName">Imię</Label>
                    <Input
                      required
                      type="text"
                      name="itemName"
                      id="itemName"
                      placeholder={ editUserData.userName }
                      value={ editUserData.userName }
                      onChange={(e) => {
                        editUserData.userName = e.target.value;
                        this.setState({ editUserData });
                      }}
                    />
                  </FormGroup>



                  <FormGroup>
                    <Label for="itemName">Nazwisko</Label>
                    <Input
                      required
                      type="text"
                      name="itemName"
                      id="itemName"
                      placeholder={ editUserData.lastName } 
       
                      value={ editUserData.lastName } 
                      onChange={(e) => {
                        editUserData.lastName = e.target.value;
                        this.setState({ editUserData });
                      }}
                    />
                  </FormGroup>




                  <FormGroup>
                    <Label for="itemName">Kompania</Label>
                    <Input
                      required
                      type="number"
                      name="kompania"
                      id="kompania"
                      placeholder={ editUserData.company  } 
                      value={ editUserData.company } 
                      onChange={(e) => {
                        editUserData.company = e.target.value;
                        this.setState({ editUserData });
                      }}
                    />
                  </FormGroup>


                  <FormGroup>
                    <Label for="itemName">Koszt</Label>
                    <Input
                      required
                      type="number"
                      name="itemName"
                      id="itemName"
                      placeholder={ loggedInData.cost } 
                      disabled
                      value={ loggedInData.cost } 
                      // onChange={(e) => {
                      //   editUserData.cost = e.target.value;
                      //   this.setState({ editUserData });
                      // }}
                    />
                  </FormGroup>



                  {/* <CardText>  </CardText> */}
                  <Button
                    color="info"
                    style={{ minWidth: "150px" }}
                    onClick={this.editUser}
                  >
                    {/* <FontAwesomeIcon icon={faPlus} />*/}
                    Zatwierdź
                  </Button>

                  {/* {loggedInData.lastName} */}
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="2">
            <Card className="m-3">
                <CardBody>
                  <CardSubtitle tag="h4">Tu będzie widok ustawień konta</CardSubtitle>
                  </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="3">
              <Card className="m-3">
                <CardBody>
                  <CardSubtitle tag="h4">Tu będzie widok historii transakcji</CardSubtitle>
                  </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="4">
              <Card className="m-3">
                <CardBody>
                  <CardSubtitle tag="h4">Tu będzie widok usunięcia konta</CardSubtitle>
                  </CardBody>
              </Card>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    );
  }
}

export default UserProfile;
