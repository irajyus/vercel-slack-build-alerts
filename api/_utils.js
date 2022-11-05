import fetch from "node-fetch";
const crypto = require("crypto");

export async function createSig(rawBody, secret) {
  return crypto.createHmac("sha1", secret).update(rawBody).digest("hex");
}
