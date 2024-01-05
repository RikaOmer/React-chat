import React, { useEffect, useState } from "react";
import "../css/chat_style.css";
import { getChatbyIdQuery } from "../../../shared/Chats/queries";
import socket from "../../../shared/Socket/socket.js";
function MessageItem({ id, mainUser, numOfMesseges, incNumOfMesseges }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function getData() {
      setMessages(await getChatbyIdQuery(id));
      const element = document.getElementById("chatBox");
      setTimeout(() => {
        element.scrollTo({
          left: 0,
          top: element.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    }
    getData();
  }, [numOfMesseges, id]);

  function styleMessage(message, index) {
    var lblClassName = "message text-white";
    if (message.sender.username === mainUser) {
      lblClassName += " my_msg   ";
    } else {
      lblClassName += " friend_msg  ";
    }

    const lbl = (
      <p>
        {message.content}{" "}
        <span>{message.created.split("T")[1].split(".")[0].slice(0, -3)}</span>
      </p>
    );
    const ListGroupItem = (
      <div key={index} className={lblClassName}>
        {lbl}
      </div>
    );

    return ListGroupItem;
  }
  socket.on("message_received", async (data) => {
    if (data.chat_id === id) {
      incNumOfMesseges();
    }
  });

  const element = document.getElementById("chatBox");
  setTimeout(() => {
    element.scrollTo({
      left: 0,
      top: element.scrollHeight,
      behavior: "auto",
    });
  }, 200);
  return (
    <div>
      {messages.map((message, index) => {
        return styleMessage(message, index);
      })}
    </div>
  );
}

export default MessageItem;
