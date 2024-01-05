import { useGetUsers } from "../../../shared/Users/queries";
function LoggedUser({ mainUser }) {
  const userData = useGetUsers(mainUser);
  if (userData.status === "loading") {
    return <div></div>;
  }
  if (userData.status === "error") {
    return <div>{userData.error.message}</div>;
  }
  return (
    <div className="d-flex align-items-center">
      <img
        className="img rounded-circle ms-2"
        width={40}
        src={userData.data.profilePic}
        alt="user profile"
      />
      <div className="ms-2 d-none d-sm-block">
        <h6 className="bld">{mainUser}</h6>
      </div>
    </div>
  );
}
export default LoggedUser;
