import Messege from "../models/message.js";
import User from "../models/users.js";
import Chat from "../models/chat.js";
import message from "../models/message.js";
const saveMsg = async (content, sender, id) => {
  const user = await User.findOne({ username: sender });
  const chat = await Chat.findOne({ _id: id });
  const msg = new Messege({ content, sender: user });
  chat.messages.push(msg);
  await msg.save();
  return await chat.save();
};

const getAllMsgs = async (id) => {
  const chat = await Chat.findOne({ _id: id });
  const messagePromises = chat.messages.map((msg) =>
    messageIdToJson(msg.valueOf())
  );
  const messages = await Promise.all(messagePromises);
  const sortedMessages = messages.sort((a, b) => {
    return a.created - b.created;
  });
  return sortedMessages;
};

const messageIdToJson = async (msg) => {
  const explicit_msg = await message.findById(msg).populate("sender").exec();

  return {
    content: explicit_msg.content,
    sender: explicit_msg.sender,
    created: explicit_msg.created,
  };
};
export default { saveMsg, getAllMsgs };
