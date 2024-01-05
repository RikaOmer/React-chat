import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import AddUserModal from "./AddUserModal";
function AddUser({
  mainUser,
  updateMainUser,
  incNumOfMesseges,
  changeCurrentUserById,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    incNumOfMesseges();
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    updateMainUser(null);
  };
  return (
    <div className="d-flex ms-auto">
      <Button
        variant="transparent"
        className="p-0 "
        type="button"
        onClick={() => setShow(true)}
      >
        <i className="bi bi-person-add text-black" style={{ fontSize: 25 }} />
      </Button>
      <Button variant="danger" type="button" onClick={logout} className="ms-2">
        LogOut
      </Button>
      <AddUserModal
        show={show}
        handleClose={handleClose}
        changeCurrentUserById={changeCurrentUserById}
      />
    </div>
  );
}
export default AddUser;
