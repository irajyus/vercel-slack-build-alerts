import crypto from "crypto";
import fetch from "node-fetch";

export function createSig(rawBody, secret) {
  return crypto.createHmac("sha1", secret).update(rawBody).digest("hex");
}

export async function postToSlack(webhookURL, messageBody) {
  try {
    const response = await fetch(webhookURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });
    const data = await response.json();

    console.log("data from fetch:", data);
    res.json({ ok: true });
  } catch (err) {
    console.log("fetch Error:", err);
    res.send({
      response_type: "ephemeral",
      text: `${err}`,
    });
  }
}
