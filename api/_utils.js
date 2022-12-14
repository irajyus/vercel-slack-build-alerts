import crypto from "crypto";
const https = require("https");
const webhookURL = process.env.SLACK_WEBHOOK_URL;

export function createSig(rawBody, secret) {
  return crypto.createHmac("sha1", secret).update(rawBody).digest("hex");
}
export function sendSlackMessage(webhookURL, messageBody) {
  // make sure the incoming message body can be parsed into valid JSON
  try {
    messageBody = JSON.stringify(messageBody);
  } catch (e) {
    throw new Error("Failed to stringify messageBody", e);
  }

  // Promisify the https.request
  return new Promise((resolve, reject) => {
    // general request options, we defined that it's a POST request and content is JSON
    const requestOptions = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };

    // actual request
    const req = https.request(webhookURL, requestOptions, (res) => {
      let response = "";

      res.on("data", (d) => {
        response += d;
      });

      // response finished, resolve the promise with data
      res.on("end", () => {
        resolve(response);
      });
    });

    // there was an error, reject the promise
    req.on("error", (e) => {
      reject(e);
    });

    // send our message body (was parsed to JSON beforehand)
    req.write(messageBody);
    req.end();
  });
}

// main
// (async function () {
//   if (!webhookURL) {
//     console.error("Please fill in your Webhook URL");
//   }

//   console.log("Sending slack message");
//   try {
//     const slackResponse = await sendSlackMessage(webhookURL, messageBody);
//     console.log("Message response", slackResponse);
//   } catch (e) {
//     console.error("There was a error with the request", e);
//   }
// })();
// export async function postToSlack(webhookURL, messageBody) {
//   axios({
//     method: "post",
//     url: webhookURL,
//     headers: { "Content-Type": "application/json" },
//     data: JSON.stringify(messageBody),
//   })
//     .then((response) => {
//       console.log("data from axios:", response.data);
//       res.json({ ok: true });
//     })
//     .catch((err) => {
//       console.log("axios Error:", err);
//       res.send({
//         response_type: "ephemeral",
//         text: `${err.response.data.error}`,
//       });
//     });
// }
