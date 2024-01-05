import React from "react";
import "../css/chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Emojies from "./chat/components/Emojies";
// import LeftMenu from "./chat/components/LeftMenu";
// import RightChat from "./chat/components/RightChat";
// import ChatHeader from "./chat/components/ChatHeader";
import LoggedUser from "./chat/components/LoggedUser";
// import AddUser from "./chat/components/AddUser";
// import SendRow from "./chat/components/SendRow";
// import AllRights from "./chat/components/AllRights";
import "./chat/css/chat.css";
import "./chat/css/chat_style.css";
function Chat({ mainUser, users }) {
  function update_current_user(user) {}
  return (
    <>
      <div className="wrappr">
        <header className="container-fluid">
          <div className="row chat-header pt-1 pb-1">
            <div className="col-5 col-sm-6 col-xl-4 p-0 border-end d-flex align-items-center justify-content-between">
              <LoggedUser mainUser={mainUser}></LoggedUser>
              {/* <AddUser></AddUser> */}
            </div>

            {/* <ChatHeader></ChatHeader> */}
          </div>
        </header>
        <main className="pers container-fluid position-relative">
          <div className="row m-2 border middle_part box">
            <div className="col-6  left">
              {" "}
              {/* <LeftMenu update_current_user={update_current_user}></LeftMenu> */}
            </div>
            {/* Left */}
            {/* Right */}
            <div className="col-6 right">
              {/* <RightChat users={users} mainUser={"barel"} /> */}
            </div>
          </div>
        </main>
        <footer className="container-fluid z-1 p-0">
          {/* Emojies */}
          {/* <Emojies></Emojies> */}
          <div className="row m-0 p-0">
            {/* <AllRights></AllRights> */}
            <div className="col">
              <div className="row">
                {/* Send Row */}
                {/* <SendRow></SendRow> */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
export default Chat;
