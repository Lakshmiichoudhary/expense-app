const Razorpay = require("razorpay");
const Order = require("../models/order");

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});

exports.createPayment = (req, res, next) => {
    const amountInRupees = 50;
    const amountInPaise = amountInRupees * 100;

    razorpayInstance.orders.create(
        { amount: amountInPaise, currency: "INR" },
        async (err, order) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }

            try {
                const newOrder = await Order.create({
                    orderid: order.id,
                    status: "PENDING",
                    userId: req.user.dataValues.id,
                });
                console.log("Order created in the table", newOrder);
                return res.status(201).json({ order, key_id: razorpayInstance.key_id });
            } catch (error) {
                console.log(error);
                res.status(500).send("Internal Server Error");
            }
        }
    );
};

exports.updatePayment = async (req, res, next) => {
    const { order_id, payment_id, status } = req.body;
    try {
        const order = await Order.findOne({ where: { orderid: order_id } });
        if (!order) {
            return res.status(404).json({ message: "Order Not Found!" });
        }

        if (status === "SUCCESS") {
            await Promise.all([
                order.update({ paymentid: payment_id, status: status }),
                req.user.update({ isPremium: true })  // Ensure it is 'isPremium' and not 'ispremium'
            ]);

            return res.status(201).json({
                success: true,
                message: "You are a premium user now!",
                isPremium: true,
            });
        } else if (status === "FAILED") {
            await order.update({ paymentid: payment_id, status: status });
            return res.status(401).json({
                success: false,
                message: "Your Payment has Failed!",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};
