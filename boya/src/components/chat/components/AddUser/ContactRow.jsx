import React from "react";
import { useGetUsers } from "../../../../shared/Users/queries";
function ContactRow({ username }) {
  const userData = useGetUsers(username);
  if (userData.status === "loading") {
    return <div></div>;
  }
  if (userData.status === "error") {
    return <div>{userData.error.message}</div>;
  }
  return (
    <div className="d-flex justify-content-center">
      <img
        src={userData.data.profilePic}
        alt="userImg"
        height={30}
        className="me-3 rounded-circle"
      />
      <label>{username}</label>
    </div>
  );
}

export default ContactRow;
