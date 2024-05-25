const User = require("../models/user");
const bcryptjs = require("bcryptjs");

exports.signUp = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create user" });
    }
};
