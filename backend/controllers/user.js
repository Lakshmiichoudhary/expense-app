const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salt = 15;

exports.signUp = async (req, res) => {
    const {name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "user already registred" });
    }
};

const generateToken = (id,isPremium) => {
    const token = jwt.sign({ id,isPremium }, process.env.JWT_TOKEN);
    //console.log("token" , token)
    return token
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
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = generateToken(user.id, user.isPremium);
        //console.log("Login successful, token:", token); 
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Failed to login" });
    }
};