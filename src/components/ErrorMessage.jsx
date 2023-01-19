import React from "react";
import "./ErrorMessage.css";

function ErrorMessage() {
  const [errorMessage, setErrorMessage] = React.useState(
    "Please enter an answer"
  );
  return <p className="error-message">{errorMessage}</p>;
}

export default ErrorMessage;
