import React, { useState } from "react";
import LoggedUser from "./chat/components/LoggedUser";
import Contacts from "./chat/components/contacts/Contacts";
import ChatHeader from "./chat/components/ChatHeader";
import RightChat from "./chat/components/RightChat";
import SendRow from "./chat/components/SendRow";
import "./chat/css/chat_style.css";
import AddUser from "./chat/components/AddUser/AddUser";

function ChatPage({
  sendMessage,
  mainUser,
  users,
  updateMainUser,
  updateUsers,
}) {
  const [currentUserChatId, setCurrentUserChatId] = useState(null);
  const [numOfMesseges, setNumOfMesseges] = useState(0);
  const changeCurrentUserById = (id) => {
    setCurrentUserChatId(id);
  };
  const incNumOfMesseges = () => {
    setNumOfMesseges(numOfMesseges + 1);
  };
  return (
    <div className="body">
      <div className="containers">
        <div className="leftSide">
          <div className="header">
            <LoggedUser mainUser={mainUser} />
            <AddUser
              mainUser={mainUser}
              updateMainUser={updateMainUser}
              incNumOfMesseges={incNumOfMesseges}
              changeCurrentUserById={changeCurrentUserById}
            />
          </div>
          <Contacts
            changeCurrentUserById={changeCurrentUserById}
            numOfMesseges={numOfMesseges}
          />
        </div>
        <div className="rightSide">
          <div className="header">
            {currentUserChatId ? (
              <ChatHeader currentUserChatId={currentUserChatId} />
            ) : (
              <div></div>
            )}
          </div>
          <div className="chatbox image-background pb-0 " id="chatBox">
            {currentUserChatId ? (
              <RightChat
                mainUser={mainUser}
                currentUserChatId={currentUserChatId}
                numOfMesseges={numOfMesseges}
                incNumOfMesseges={incNumOfMesseges}
              />
            ) : (
              <div></div>
            )}
          </div>

          <div className="">
            {currentUserChatId ? (
              <SendRow
                currentUserChatId={currentUserChatId}
                incNumOfMesseges={incNumOfMesseges}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
