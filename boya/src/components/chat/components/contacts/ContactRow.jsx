import React from "react";
function ContactRow({
  contactName,
  contactImg,
  lastMessage,
  lastMessageTime,
  unreadMessages,
  changeCurrentUserById,
  contactId,
  numOfMesseges,
}) {
  function changeCurrent(e) {
    changeCurrentUserById(contactId);
  }
  return (
    <button
      onClick={changeCurrent}
      className="pt-3 d-flex list-group-item border-0 list-group-item-action h_effect "
    >
      <img
        className="img rounded-circle me-2"
        height={40}
        src={contactImg}
        alt="userImg"
      />
      <div className="text-truncate d-sm-inline-block d-none">
        <h6 className="me-2 bld">{contactName}</h6>
        <p className="form-text">{lastMessage}</p>
      </div>
      <div className="ms-auto">
        <span className="text-muted small">
          {lastMessageTime.split("T")[0]}
        </span>
        {/* <br />
        {unreadMessages ? (
          <span className="badge bg-success rounded-circle mb-4 mb-lg-1">
            {unreadMessages}
          </span>
        ) : (
          <span></span>
        )} */}
      </div>
    </button>
  );
}
export default ContactRow;
