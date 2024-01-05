import React, { useRef } from "react";
import "../css/chat_style.css";
import socket from "../../../shared/Socket/socket.js";
function SendRow({ currentUserChatId, incNumOfMesseges }) {
  const messageInput = useRef();
  const send_message = async (e) => {
    e.preventDefault();
    const msg = messageInput.current.value;
    e.target.reset();
    const url =
      process.env.REACT_APP_API_URL +
      "/api/Chats/" +
      currentUserChatId +
      "/Messages";
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg }),
    });
    incNumOfMesseges();
    const element = document.getElementById("chatBox");
    setTimeout(() => {
      element.scrollTo({
        left: 0,
        top: element.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
    e.target.reset();
    socket.emit("message_sent", { chat_id: currentUserChatId });
  };
  return (
    <form className=" chat_input" onSubmit={send_message} autoComplete="off">
      <div className="input-group " name="sendRow">
        <input
          className="form-control rounded-start me-0"
          type="Type a message"
          placeholder="Type a message"
          aria-describedby="basic-addon1"
          name="message_input"
          ref={messageInput}
        />
        <span className="input-group-text bg-success rounded-end">
          <button className="bg-success border-0 text-white" type="submit">
            <i className="bi bi-send" />
          </button>
        </span>
      </div>
    </form>
  );
}
export default SendRow;
