export default async function handler(req, res) {
  try {
    const url = req.method === "POST" ? req.body.url : req.query.url;

    if (!url) {
      return res.status(400).json({ error: "Missing URL" });
    }

    const response = await fetch(
      `https://enrichlayer.com/api/v2/company?url=${encodeURIComponent(url)}&resolve_numeric_id=true&categories=exclude&funding_data=exclude&extra=exclude&exit_data=exclude&acquisitions=exclude&use_cache=if-present`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`
        }
      }
    );

    const data = await response.text();

    return res.status(response.status).send(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
