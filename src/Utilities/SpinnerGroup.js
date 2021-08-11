import React from "react";
import { Spinner } from "reactstrap";
import "./Spinner.css";

const SpinnerGroup = () => {
  return (
    <div className="gridCenter">
      <div>
        <Spinner type="grow" color="info" />
        <Spinner type="grow" color="info" />
        <Spinner type="grow" color="info" />
      </div>
    </div>
  );
};

export default SpinnerGroup;
