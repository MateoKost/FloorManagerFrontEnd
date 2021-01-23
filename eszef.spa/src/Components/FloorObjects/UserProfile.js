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
} from "@fortawesome/free-solid-svg-icons";
import { Label, FormGroup, Input } from "reactstrap";
import classnames from "classnames";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    let token = "Bearer " + JSON.parse(localStorage.getItem("login")).store;
    this.state = {
      toke: token,
      activeTab: "1",
      editUserData: {
        email: "123",
        password: "123",
 
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


  

  editUser  = async (editUserData) => {

    let params2 = {
      email: editUserData.email,
      password: editUserData.password,
    };

    axios
      .put("https://localhost:5001/login/user", params2, {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((_) => {
        localStorage.clear(); 
        this.setState({
          dataChanged: true
        })
        //history.push("/");
      });
  };



  componentDidMount() {}

  render() {
    const { editUserData, dataChanged } = this.setState;

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
                    />
                  </FormGroup>

                  <FormGroup >
                    <Label for="itemName">Hasło</Label>
                    <Input
                      required
                      type="password"
                      name="itemName"
                      id="itemName"
                      placeholder="Hasło"

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
