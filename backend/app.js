const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/database");
require("dotenv").config();

// Import the user routes
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

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

