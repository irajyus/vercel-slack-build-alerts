import { createSig } from "./_utils";
const secret = process.env.OAUTH2_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(404).end();
  try {
    const body = await req.body;
    const rawBody = JSON.stringify(body);
    const signature = createSig(rawBody, secret);
    const xvs = req.headers["x-vercel-signature"];
    if (signature !== xvs) {
      return res.status(403).end();
    } else {
      console.log("Signature matched");
    }
    console.log(xvs);
    console.log(signature);
    console.log(rawBody);
    console.log(typeof rawBody);
  } catch (error) {
    console.log(error.message);
  } finally {
    return res.status(200).end();
  }
}
