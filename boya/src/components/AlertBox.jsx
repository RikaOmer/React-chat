import React from "react";
import Alert from "react-bootstrap/Alert";
function AlertBox(props) {
  return (
    <Alert key={props.color} variant={props.color} className="text-center">
      {props.text}
    </Alert>
  );
}

export default AlertBox;
