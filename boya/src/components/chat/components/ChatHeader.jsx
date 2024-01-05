import React from "react";
import {useGetUserbyChatId} from "../../../shared/Chats/queries";

function ChatHeader({ currentUserChatId }) {

const currentUser = useGetUserbyChatId(currentUserChatId);
if (currentUser.status === "loading") return <div>Loading...</div>;
if (currentUser.status === "error") return <div>Error</div>;
  return (
    <div className="p-0 w-100 d-flex justify-content-between">
      <div className="d-flex ms-2 align-items-center">
        <img
          className="img rounded-circle me-3 mt-1"
          height={40}
          src={currentUser.data.users[0].profilePic}
          alt="currentUserPhoto"
        />
        <div>
          <h6 className="bld">{currentUser.data.users[0].displayName}</h6>
        </div>
      </div>
    </div>
  );
}
export default ChatHeader;
