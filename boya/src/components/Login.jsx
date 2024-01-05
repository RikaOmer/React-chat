import React from "react";
import LoginBox from "./login/components/LoginBox";
import { Container } from "react-bootstrap";
import "../css/background.css";
function Login(props) {
  return (
    <div>
      <div className="head bg-success position-absolute"></div>
      <Container fluid="lg" className="center">
        <LoginBox {...props} />
      </Container>
    </div>
  );
}

export default Login;
