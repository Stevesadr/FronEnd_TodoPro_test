import Cookies from "js-cookie";

export const GET = (url) => {
  const res = fetch(`https://backend-todopro-test.onrender.com/${url}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res;
};
