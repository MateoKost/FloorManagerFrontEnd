import "../../App.css";
import React, { useContext } from "react";

import AutoSlider from "./AutoSlider";

import { Button } from "reactstrap";

import SignInModal from "./Modals/SignInModal";
import RegisterModal from "./Modals/RegisterModal";

import { ModalContext } from "./Modals/ModalContext";

const LandingPage = () => {
  return (
    <div>
      <AutoSlider />
      <footer className="gridCenter mt-lg-3">
        <RegisterButton />
      </footer>
      <SignInModal />
      <RegisterModal />
    </div>
  );
};

export default LandingPage;

const RegisterButton = () => {
  const { toggleRegisterModal } = useContext(ModalContext);

  return (
    <Button
      color="dark"
      className="p-4 mt-1"
      onClick={() => {
        toggleRegisterModal();
      }}
    >
      {" "}
      Zarejestruj się{" "}
    </Button>
  );
};
