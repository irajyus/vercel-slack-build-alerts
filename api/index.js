const crypto = require("crypto");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(404).end();
  try {
    const body = await req.body;
    const rawBody = JSON.stringify(body);
    const xvs = req.headers["x-vercel-signature"];
    const signature = crypto
      .createHmac("sha1", process.env.OAUTH2_SECRET)
      .update(rawBody)
      .digest("hex");
    console.log(xvs);
    console.log(signature);
    console.log(rawBody);
    console.log(typeof rawBody);
    console.log(req.headers);
  } catch (error) {
    console.log(error.message);
  } finally {
    res.json({ received: true });
  }
}
