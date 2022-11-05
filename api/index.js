import { createSig, sendSlackMessage } from "./_utils.js";
const secret = process.env.OAUTH2_SECRET;
const webhookURL = process.env.SLACK_WEBHOOK_URL;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(404).end();
  try {
    const body = await req.body;
    const rawBody = JSON.stringify(body);
    const signature = createSig(rawBody, secret);
    const xvs = req.headers["x-vercel-signature"];
    console.log(xvs);
    console.log(signature);
    console.log(rawBody);
    console.log(typeof rawBody);
    if (signature !== xvs) {
      return res.status(403).end();
    } else {
      let messageBody = { username: "Vercel Alert", text: "Build Error" };
      console.log("Signature matched");
      sendSlackMessage(webhookURL, messageBody);
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    return res.status(200).end();
  }
}
