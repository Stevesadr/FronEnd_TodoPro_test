import Cookies from "js-cookie";

export const GET = (url) => {
  const res = fetch(`http://127.0.0.1:5000/${url}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res;
};
