import fetch from "node-fetch";
import crypto from "crypto";

export async function createSig(rawBody, secret) {
  return crypto.createHmac("sha1", secret).update(rawBody).digest("hex");
}
