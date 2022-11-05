import crypto from "crypto";
import axios from "axios";

export function createSig(rawBody, secret) {
  return crypto.createHmac("sha1", secret).update(rawBody).digest("hex");
}

export async function postToSlack(webhookURL, messageBody) {
  axios({
    method: "post",
    url: webhookURL,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(messageBody),
  })
    .then((response) => {
      console.log("data from axios:", response.data);
      res.json({ ok: true });
    })
    .catch((err) => {
      console.log("axios Error:", err);
      res.send({
        response_type: "ephemeral",
        text: `${err.response.data.error}`,
      });
    });
}
