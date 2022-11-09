import { createSig, sendSlackMessage } from "./_utils.js";
const secret = process.env.OAUTH2_SECRET;
const webhookURL = process.env.SLACK_WEBHOOK_URL;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(404).end();
  try {
    const body = await req.body;
    const production = req.body.payload.target === "production";
    console.log(production);
    const rawBody = JSON.stringify(body);
    const signature = createSig(rawBody, secret);
    const xvs = req.headers["x-vercel-signature"];
    if (signature !== xvs) {
      return res.status(403).end();
    } else if (production) {
      const { name, inspectorUrl } = req.body.payload.deployment;
      let messageBody = {
        text: "*Vercel Build Failure*",
        attachments: [
          {
            color: "#fa1e3c",
            fields: [{ title: "Project", value: name, short: true }],
            actions: [
              {
                type: "button",
                text: "Details",
                url: inspectorUrl,
              },
            ],
          },
        ],
      };
      try {
        const slackResponse = await sendSlackMessage(webhookURL, messageBody);
        console.log("Message response", slackResponse);
      } catch (e) {
        console.error("There was a error with the request", e);
      }
    } else {
      console.log("Non-production build, ending request");
    }
  } catch (error) {
    console.log(error.message);
  }
  return res.status(200).send("OK");
  // finally {
  //   return res.status(200).send("OK");
  // }
}
