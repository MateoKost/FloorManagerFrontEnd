import React, { useEffect, useState  } from "react";

import SpinnerGroup from "../Utilities/SpinnerGroup";
import "../Utilities/Spinner.css"
import { useHistory } from "react-router-dom";
import axios from 'axios';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  let history = useHistory();

  useEffect(() => {
    currentUserChanged();
    // auth.onAuthStateChanged((user) => {
    //   setCurrentUser(user)
    //   setPending(false);
    // });
  }, [localStorage]);


function currentUserChanged(){
  let store = JSON.parse(localStorage.getItem('login'));
  if(store && store.login){
    // alert(store.login)
    setCurrentUser(store)
    setPending(false)
  }
}

  async function signInWithEmailAndPassword({ email, password }){
  
    const loginParams = {
      "email": email.value,
      "password": password.value
    };
    
    // console.log(JSON.parse(loginParams))
    console.log(loginParams)
    // console.log({ email, password })

    axios.post('https://localhost:5001/login', loginParams) 
      .then((result)=>{
        
      console.log("result"+result);
      
      localStorage.setItem('login',JSON.stringify({
        login:true,
        store:result.data.token,
        loginData:loginParams
      }))
     
    }).then(()=>currentUserChanged())

  
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
        signInWithEmailAndPassword,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


