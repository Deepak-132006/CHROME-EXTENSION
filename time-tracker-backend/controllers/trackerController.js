const SiteVisit = require("../models/SiteVisit");

const trackUsage = async (req, res) => {
  try {
    const { domain, duration, userId } = req.body;
    const newVisit = new SiteVisit({ domain, duration, userId });
    await newVisit.save();
    res.status(200).json({ message: "Visit recorded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserAnalytics = async (req, res) => {
  const userId = req.params.userId;
  try {
    const data = await SiteVisit.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$domain",
          totalDuration: { $sum: "$duration" }
        }
      },
      { $sort: { totalDuration: -1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { trackUsage, getUserAnalytics };
