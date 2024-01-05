import React, { useEffect } from "react";
import AlertBox from "../../../AlertBox";
import Select from "react-select";
import { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
function AddUserModal({ show, handleClose, changeCurrentUserById }) {
  const [newUserImage, setNewUserImg] = useState("male_avatar.png");
  const alertBox = useRef();
  const [addUserDisabled, setAddUserDisabled] = useState(true);
  const [newUserName, setNewUserName] = useState("UnKnown");
  const [selectedOption, setSelectedOption] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const users = await fetch(process.env.REACT_APP_API_URL + "/api/Users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      return users.json();
    }
    fetchData().then(
      (users) => {
        const usersOptions = users.map((user) => {
          return {
            value: { username: user.username, img: user.profilePic },
            label: (
              <div className="d-flex justify-content-center">
                <img
                  src={user.profilePic}
                  alt="userImg"
                  height={30}
                  className="me-3 rounded-circle"
                />
                <label>{user.displayName}</label>
              </div>
            ),
          };
        });
        setSelectedOption(usersOptions);
      }
      // setSelectedOption([
      //   {
      //     value: { username: "aviavi", img: "avi.jpeg" },
      //     label: (
      //       <div className="d-flex justify-content-center">
      //         <img
      //           src={"avi.jpeg"}
      //           alt="userImg"
      //           height={30}
      //           className="me-3 rounded-circle"
      //         />
      //         <label>avi1</label>
      //       </div>
      //     ),
      //   },
      // TOO MANY USERS
      // <ContactRow username="barel" />
      // ]
    );
  }, [setSelectedOption]);

  function loadUserData(selectedUser) {
    const newUser = selectedUser.value;
    setAddUserDisabled(false);
    alertBox.current.classList.add("d-none");
    setNewUserName(newUser.username);
    setNewUserImg(newUser.img);
    return;
  }

  const AddToChat = async () => {
    const url = process.env.REACT_APP_API_URL + "/api/Chats";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ username: newUserName }),
    })
      // .then((res) => res.json())
      .then(async (res) => {
        // console.log(res);
        if (res.status === 200) {
          const re = await res.json();
          changeCurrentUserById(re._id);
          closeModal();
        }
        if (res.status === 400) {
          alertBox.current.classList.remove("d-none");
        }
      });
  };

  const closeModal = () => {
    handleClose();
    setAddUserDisabled(true);
    setNewUserName(null);
    setNewUserImg("male_avatar.png");
  };
  return (
    <Modal show={show} onHide={closeModal} id="AddPerson">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Add Contact
            </h1>
            <button type="button" className="btn-close" onClick={closeModal} />
          </div>
          <div className="modal-body">
            <div className="input-group">
              <Select
                // value={selectedOption}
                onChange={(selectedOption) => loadUserData(selectedOption)}
                options={selectedOption}
                isSearchable={true}
                placeholder="Select User"
                className="rounded-start w-100"
                onSelect={loadUserData}
              />
            </div>
            <div>
              <div className="container mt-3">
                <div className="row">
                  <div className="col-5 mx-auto">
                    <img
                      src={newUserImage}
                      className="img-thumbnail rounded-circle mx-auto shadow p-2 mb-3"
                      alt="user"
                    />
                  </div>
                </div>
                <div className="row text-center">
                  <label className="form-label">{newUserName}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer container">
            <div className="row w-100">
              <div className="p-0 d-none" ref={alertBox}>
                <AlertBox
                  color="danger"
                  text="You are already friends with this user"
                />
              </div>
              <button
                type="button"
                className="btn bg-success align-items-center "
                data-bs-dismiss="modal"
                disabled={addUserDisabled}
                onClick={AddToChat}
              >
                Start Chat <i className="ms-1 bi bi-send-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddUserModal;
