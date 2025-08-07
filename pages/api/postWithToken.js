import Cookies from "js-cookie";

export const POSTWITHTOKEN = async (url, body) => {
  const res = fetch(`https://todopro-uhvq.onrender.com/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: JSON.stringify({ body }),
  });
  return res;
};
