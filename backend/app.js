const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/database");
const cookieParser = require("cookie-parser")
require("dotenv").config();

// Import the user routes
const userRouter = require("./routes/user");

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

// Use the user router for /user routes
app.use("/user", userRouter);

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log("server running at 3000");
        });
    })
    .catch(error => {
        console.error('Failed to sync database:', error);
    });

