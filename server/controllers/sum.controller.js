const axios = require("axios");

class SumController {
  async summarize(req, res, next) {
    try {
      const { text } = req.body;
      const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

      const response = await axios.post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        { inputs: text },
        {
          headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` },
        }
      );

      res.json({ summary: response.data[0].summary_text });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SumController();
