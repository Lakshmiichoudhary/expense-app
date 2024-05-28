const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salt = 15;

exports.signUp = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        const hashedPassword = await bcryptjs.hash(password, salt);
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

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email and password" });
        }
        // Generate token and send it in the response
        const token = generateToken(user.id);
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to login" });
    }
};
