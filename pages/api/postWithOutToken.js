export const POST = (url, valeus) => {
  const res = fetch(`http://127.0.0.1:5000/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(valeus),
  });
  return res;
};
