// pages/api/mongodbWebhook.js
export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body; // Process data from MongoDB change
      // Update your Next.js app's state or trigger actions based on the data

      res.status(200).json({ message: "Webhook received and processed." });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.status(405).end();
  }
}
