import Cookies from "js-cookie";

export const GET = (url) => {
  const res = fetch(
    `https://condescending-chaplygin-seyoks7xu.liara.run/${url}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return res;
};
