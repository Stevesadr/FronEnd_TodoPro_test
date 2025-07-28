export const POST = (url, valeus) => {
  const res = fetch(`https://backend-todopro-test.onrender.com/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(valeus),
  });
  return res;
};
