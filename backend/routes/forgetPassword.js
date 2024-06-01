const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/password");

router.post("/forgot-password", passwordController.forgetPassword);
router.get("/resetpassword/:id", passwordController.resetPassword);
router.post("/updatepassword/:id", passwordController.updatePassword);

module.exports = router;
