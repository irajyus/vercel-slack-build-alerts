import { createSig } from "./_utils";
const secret = process.env.OAUTH2_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(404).end();
  try {
    const body = await req.body;
    const rawBody = JSON.stringify(body);
    const signature = createSig(rawBody, secret);
    if (signature !== req.headers["x-vercel-signature"]) {
      return res.status(403).json({
        code: "invalid_signature",
        error: "signature didn't match",
      });
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
    res.json({ received: true });
  }
}
