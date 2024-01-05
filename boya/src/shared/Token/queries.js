export const getToken = async (body) => {
  const url = process.env.REACT_APP_API_URL + "/api/Tokens";
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return resp;
};
