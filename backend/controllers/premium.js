const User = require("../models/user");

exports.showLeaderboard = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["name", "total_expense"],
      order: [["total_expense", "DESC"]],
    });
    console.log("Leaderboard data:", users); 
    res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch leaderboard data" });
  }
};
