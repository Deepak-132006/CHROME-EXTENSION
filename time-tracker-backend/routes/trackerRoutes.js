const express = require("express");
const router = express.Router();
const {
  trackUsage,
  getUserAnalytics
} = require("../controllers/trackerController");

router.post("/track", trackUsage);
router.get("/analytics/:userId", getUserAnalytics);

module.exports = router;
