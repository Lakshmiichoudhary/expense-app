const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/order");

const Authenticate = require("../middleware/auth");

router.post("/createOrder", Authenticate, paymentController.createPayment);
router.post("/updateOrder", Authenticate, paymentController.updatePayment);

module.exports = router;