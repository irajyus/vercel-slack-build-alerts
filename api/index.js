export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(404).end();
  try {
    const body = await req.body;
    const rawBody = JSON.stringify(body);
    console.log(rawBody);
    console.log(typeof rawBody);
    console.log(req.headers);
  } catch (error) {
    console.log(error.message);
  } finally {
    res.json({ received: true });
  }
}
