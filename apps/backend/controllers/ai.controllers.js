import aiService from "../services/ai.service.js";

export const getReview = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).send("Code is required");
  }

  try {
    const response = await aiService(code);
    res.status(200).send(response);
  } catch (error) {
    console.error("Error in getReview:", error);
    res.status(500).send("Error generating review");
  }
};
