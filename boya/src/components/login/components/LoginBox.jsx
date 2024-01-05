import { React, useRef } from "react";
import logo from "../../../images/logo/high-res-logo.png";
import "../scripts/login_script.js";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../AlertBox";
import { getToken } from "../../../shared/Token/queries";
function LoginBox({ users, updateMainUser, mainUser }) {
  const username_txt = useRef();
  const password_txt = useRef();
  const alertBox = useRef();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const username = username_txt.current.value;
    const password = password_txt.current.value;
    const resp = await getToken({ username, password });
    if (resp.status !== 200) {
      alertBox.current.classList.remove("d-none");
      return;
    }
    localStorage.setItem("token", "bearer " + (await resp.text()));
    localStorage.setItem("username", username);
    updateMainUser(username);

    navigate("/chat");
  };
  return (
    <Container fluid className="bg-light pt-3 rounded-3">
      <Row className="mb-3">
        <Col></Col>
        <Image
          className="img img-fluid ms-3 mb-3 mt-3 col-6 col-sm-4 col-lg-3 col-xl-2"
          src={logo}
          alt="site logo"
        />
        <Col></Col>
      </Row>
      <Form onSubmit={submit} className="rounded pb-3 ps-5 pe-5">
        <Row className="mb-3">
          <Form.Control ref={username_txt} placeholder="Usename" required />
        </Row>
        <Row className="mb-3">
          <Form.Control
            ref={password_txt}
            type="password"
            placeholder="Password"
            required
          />
        </Row>
        <Row className="mb-3">
          <Button variant="success" type="submit">
            Sign In
          </Button>
        </Row>
        <Row>
          <Form.Label className="text-center">
            Not registered?
            <Link to="/register"> Click Here </Link>
            to register
          </Form.Label>
        </Row>
        <Row ref={alertBox} className="d-none">
          <AlertBox color="danger" text="Wrong username or password" />
        </Row>
      </Form>
    </Container>
  );
}

export default LoginBox;
