export const POST = (url, valeus) => {
  const res = fetch(
    `https://condescending-chaplygin-seyoks7xu.liara.run/${url}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valeus),
    }
  );
  return res;
};
