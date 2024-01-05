import { useQuery } from "react-query";
export const useGetChats = () =>
  useQuery("chats" + new Date().toString(), async () => {
    const url = process.env.REACT_APP_API_URL + "/api/Chats";
    return fetch(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  });

export const getChatbyIdQuery = async (id) => {
  const url = process.env.REACT_APP_API_URL + "/api/Chats/" + id + "/Messages";
  const response = await fetch(url, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return await response.json();
};

// export const getUserbyChatId = async (id) => {
//   const url = process.env.REACT_APP_API_URL + "/api/Chats/" + id;
//   const response = await fetch(url, {
//     headers: {
//       Authorization: localStorage.getItem("token"),
//     },
//   });
//   return await response.json();
// }

export const useGetUserbyChatId = (id) =>
  useQuery("chats" + id, () => {
    const url = process.env.REACT_APP_API_URL + "/api/Chats/" + id;
    return fetch(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => res.json());
  });
