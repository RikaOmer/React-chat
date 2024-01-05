import User from "../models/users.js";
import UserPass from "../models/userPass.js";
const saveUser = async (username, displayName, profilePic, password) => {
  const user = new User({ username, displayName, profilePic });
  const userPass = new UserPass({ username, password });
  await userPass.save();
  return await user.save();
};

const getUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const getUsersAllUsers = async () => {
  return await User.find({});
};

export default { saveUser, getUserByUsername, getUsersAllUsers };
