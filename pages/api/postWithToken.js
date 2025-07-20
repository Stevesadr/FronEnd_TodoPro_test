import Cookies from "js-cookie";

export const POSTWITHTOKEN = async (url, body) => {
  const res = fetch(`http://127.0.0.1:5000/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: JSON.stringify({ body }),
  });
  return res;
};
