import { useQuery } from "react-query";

const getUsersByIdQuery = async (username) => {
  const url = process.env.REACT_APP_API_URL + "/api/Users/" + username;
  const response = await fetch(url, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return await response.json();
};
export const useGetUsers = (username) =>
  useQuery(`${getUsersByIdQuery.name + username}`, () =>
    getUsersByIdQuery(username)
  );
