export const POST = (url, valeus) => {
  const res = fetch(`https://todopro-uhvq.onrender.com/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(valeus),
  });
  return res;
};
