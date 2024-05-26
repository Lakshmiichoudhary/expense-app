const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")

const salt = 15

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

exports.login = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.findOne({where:{email}});
        //console.log(user)
        if(!user){
            return res.status(400).json({message : "Invalid email"})
        }
        const isPasswordValid = await bcryptjs.compare(password,user.password);
        //console.log(isPasswordValid)
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email and password"})
        }
        const token = jwt.sign({userID: user.id},process.env.JWT_TOKEN,{
            expiresIn : "1h"
        })
        res.cookie('token',token,{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        })
        return res.status(200).json({ message: "Login successful" }); 
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Failed to login" });
    }
}
