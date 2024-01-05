import { useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import MessageItem from "./MessageItem";
import "../css/chat.css";
function RightChat({ mainUser, currentUserChatId, numOfMesseges,incNumOfMesseges }) {
  const list = useRef();

  return (
    <ListGroup className="mt-auto" ref={list}>
      <MessageItem
        id={currentUserChatId}
        mainUser={mainUser}
        numOfMesseges={numOfMesseges}
        incNumOfMesseges={incNumOfMesseges}
      />
    </ListGroup>
  );
}
export default RightChat;
