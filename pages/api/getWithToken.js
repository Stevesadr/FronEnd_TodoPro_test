import Cookies from "js-cookie";

export const GET = (url) => {
  const res = fetch(`https://todopro-uhvq.onrender.com/${url}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res;
};
