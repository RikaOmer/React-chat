import React from "react";
import logo from "../images/logo/high-res-logo.png";
import ContactForm from "./ContactForm";
function Register({ addUser }) {
  return (
    <>
      <div className="head bg-success position-absolute"></div>
      <main className="center">
        <div className="container bg-light w-50 ps-4 pe-4">
          <div className="row">
            <div className="col"></div>
            <img
              className="img img-fluid ms-3 mb-3 mt-3 col-6 col-sm-4 col-lg-3 col-xl-2"
              src={logo}
              alt="logo"
            />
            <div className="col"></div>
          </div>
          <ContactForm addUser={addUser} />
        </div>
      </main>
    </>
  );
}

export default Register;