import React from "react";
import { useGetChats } from "../../../../shared/Chats/queries";
import ContactRow from "./ContactRow";
function Contacts({ changeCurrentUserById, numOfMesseges }) {
  const contactList = useGetChats();
  if (contactList.status === "loading") return <div></div>;
  if (contactList.status === "error") return <div>Error</div>;
  const sortedContactList = contactList.data.sort(
    (a, b) =>
      new Date(b.lastMessage?.created) - new Date(a.lastMessage?.created)
  );
  return (
    <ul className="list-group over" style={{ maxHeight: "70%" }}>
      <div
        className="
       "
      ></div>
      {sortedContactList.map((contact, index) => (
        <div key={index}>
          <ContactRow
            contactName={contact.user.displayName}
            contactImg={contact.user.profilePic}
            lastMessage={contact.lastMessage ? contact.lastMessage.content : ""}
            lastMessageTime={
              contact.lastMessage ? contact.lastMessage.created : ""
            }
            unreadMessages="0"
            changeCurrentUserById={changeCurrentUserById}
            contactId={contact.id}
            numOfMesseges={numOfMesseges}
          />
        </div>
      ))}
      {/* <ContactListResults
        users={users}
        mainUser={mainUser}
        contactList={contactList}
        changeCurrentUser={changeCurrentUser}
      ></ContactListResults> */}
      {/* END Here */}
    </ul>
  );
}
export default Contacts;
