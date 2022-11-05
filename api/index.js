export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(404).end();
  try {
    let rawBody = getRawBody(req);
    console.log(rawBody);
    console.log(req.headers);
  } catch (error) {
    console.log(error.message);
  } finally {
    res.json({ received: true });
  }
}

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let bodyChunks = [];
    req.on("end", () => {
      const rawBody = Buffer.concat(bodyChunks).toString("utf8");
      resolve(rawBody);
    });
    req.on("data", (chunk) => bodyChunks.push(chunk));
  });
}
