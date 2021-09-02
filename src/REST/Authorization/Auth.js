import React, { useEffect, useState } from "react";

import SpinnerGroup from "../../Utilities/SpinnerGroup";
import "../../Utilities/Spinner.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [pending, setPending] = useState(true);
  let history = useHistory();

  useEffect(() => {
    currentUserChanged();
    // auth.onAuthStateChanged((user) => {
    //   setCurrentUser(user)
    //   setPending(false);
    // });

  }, [localStorage]);

  useEffect(() => {
    currentUserDebtUpdated();
  }, [currentUser]);

  function currentUserChanged() {
    let store = JSON.parse(localStorage.getItem("login"));
    if (store && store.login) {
      // alert(store.login)
      // alert(store.login.)
      setCurrentUser(store);
      setPending(false);
    }
  }

  function currentUserDebtUpdated() {
    let store = JSON.parse(localStorage.getItem("login"));

    if (store && store.login) {
      let email = store.loginData.email;
      axios
        .get("https://localhost:5001/login/user/" + email, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("login")).store,
          },
        })
        .then((result) => {
          // console.log(result.data)
          // alert(result.data.cost)
          setCurrentUserData({
            userName: result.data.userName,
            lastName: result.data.lastName,
            company: result.data.company,
            cost: result.data.cost,
          });
        });
    }
    // .then(() => currentUserDebtUpdated());
  }


  async function updateDebt (debt)  {
    // const editUserCostZero = async () => {
    // const { loggedInData, cost } = this.state;

    // console.log(currentUserData);
    // alert(currentUserData.company)
    // alert(parseInt(currentUserData.company))
    // alert(currentUser.loginData.email)
    // alert(debt)

    let params2 = {
      email: currentUser.loginData.email,
      userName: currentUserData.userName,
      lastName: currentUserData.lastName,
      company: parseInt(currentUserData.company),
      cost: debt,
    };

    // console.log(params2);

    axios
      .put("https://localhost:5001/login/user/", params2, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("login")).store,
        },
      })
      .then((_) => {
        // this.getUserParams();
        // //  localStorage.clear();
        // // this.setState({
        // //   dataChanged: true
        // // })
      });
  }


  async function signInWithEmailAndPassword({ email, password }) {
    const loginParams = {
      email: email.value,
      password: password.value,
    };

    axios
      .post("https://localhost:5001/login", loginParams)
      .then((result) => {
        console.log("result" + result.data);

        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            store: result.data.token,
            loginData: loginParams,
          })
        );
      })
      .then(() => currentUserChanged());
  }

  async function signOut() {
    setCurrentUser(null);
    localStorage.clear();
    history.push("/");
    window.location.reload();
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserData,
        signInWithEmailAndPassword,
        signOut,
        updateDebt
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
