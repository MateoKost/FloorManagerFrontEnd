import React, { useState, Component } from 'react';
//import { GoogleSpreadsheet,  } from "google-spreadsheet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv
  } from '@fortawesome/free-solid-svg-icons'

import { 
  Button
} from 'reactstrap';


import axios from 'axios';


// const appendSpreadsheetRow = async () => {





// let params2 = {
//   // idSoldier: editSoldierData.idSoldier,
//   // name: editSoldierData.name,
//    Id: 123,
//    Name: "Babla"
//  };

// await axios.post("https://sheet.best/api/sheets/3b214432-e281-43be-8ad0-b2ec30c93c6c/tabs/Pierwszy",  params2 
// );


// }





// const getItems = async () => {
//   await axios
//     .get("https://localhost:5001/item", {
//       headers: {
//         Authorization: "Bearer " + JSON.parse(localStorage.getItem("login")).store
//       },
//     })
//     .then((response) => {
//       this.setState({
//         items: response.data,
//       });
//     });
// };



// const GoogleExcel = (props) => {
 
//     return (
//       <Button color="dark"  style={{minWidth:"100px"}} 
//         onClick={e=>{ getItems().then(appendSpreadsheetRow());  window.open("https://docs.google.com/spreadsheets/d/1Ma0DdmTumJHwl3e3SXDkjzFydlYVbG2ruC2imBahZ3g/", "_blank"); }  }>       
//       <div><FontAwesomeIcon icon={faFileCsv} className="fa-lg"/></div>
//       <div style={{marginTop: -4}}><span style={{fontSize: 12}}>Eksportuj</span></div>
//       </Button>
//     )
// };





class GoogleExcel extends Component {
  constructor(props) {
    super(props);
    const token = "Bearer " + JSON.parse(localStorage.getItem("login")).store;
    this.state = {
      token: token,
      items:[]
    };
  }

  getItems = async () => {
  await axios
    .get("https://localhost:5001/item", {
      headers: {
        Authorization: this.state.token
      },
    })
    .then( async (response) => {

      // await axios.delete("https://sheet.best/api/sheets/3b214432-e281-43be-8ad0-b2ec30c93c6c/tabs/Pierwszy/Name/*"
      // );


      response.data.map( async ({ id, idRoom, itemName, isRepaired }) => {
        let params2 = {
          // idSoldier: editSoldierData.idSoldier,
          // name: editSoldierData.name,
           Id: id,
           Nazwa: itemName,
           Stan: isRepaired,
           Pomieszczenie: idRoom,
         };
        
        await axios.post("https://sheet.best/api/sheets/3b214432-e281-43be-8ad0-b2ec30c93c6c/tabs/Pierwszy",  params2 
        );
        
      });

      this.setState({
        items: response.data,
      });
    });
};




appendSpreadsheetRow = async () => {





let params2 = {
  // idSoldier: editSoldierData.idSoldier,
  // name: editSoldierData.name,
   Id: 123,
   Name: "Babla"
 };

await axios.post("https://sheet.best/api/sheets/3b214432-e281-43be-8ad0-b2ec30c93c6c/tabs/Pierwszy",  params2 
);


}


  render(){

    return (
      <Button color="dark"  style={{minWidth:"100px"}} 
        onClick={e=>{ this.getItems() ;  window.open("https://docs.google.com/spreadsheets/d/1Ma0DdmTumJHwl3e3SXDkjzFydlYVbG2ruC2imBahZ3g/", "_blank"); }  }>       
      <div><FontAwesomeIcon icon={faFileCsv} className="fa-lg"/></div>
      <div style={{marginTop: -4}}><span style={{fontSize: 12}}>Eksportuj</span></div>
      </Button>
    )

  }


}






export default GoogleExcel;




