const express = require("express");
const router = express.Router();
const premiumController = require("../controllers/premium");

const Authenticate = require("../middleware/auth");

router.get("/leaderboard",Authenticate,premiumController.showLeaderboard);

module.exports = router;