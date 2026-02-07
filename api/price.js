export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    "usd.t": {
      "usd": 1.0000,
      "usd_24h_change": "0.00%",
      "market_cap": "$10T",
      "last_updated_at": Math.floor(Date.now() / 1000)
    }
  });
}

