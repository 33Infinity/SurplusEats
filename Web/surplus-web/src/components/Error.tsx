import React from "react";
import ErrorModel from "../models/Error";
import { Button } from "@material-ui/core";

interface Props {
  error: ErrorModel;
  redirectUrl: string;
}

const Error: React.FC<Props> = (props) => {
  function handleRedirect() {
    window.location.href = props.redirectUrl;
  }
  return (
    <div>
      <h1>Error Occurred</h1>
      <label>{props.error.ErrorMessage}</label>
      <Button onClick={handleRedirect}></Button>
    </div>
  );
};

export default Error;
