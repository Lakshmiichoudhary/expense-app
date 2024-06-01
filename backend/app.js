const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/database");
const cookieParser = require("cookie-parser")
require("dotenv").config();

// routes
const userRouter = require("./routes/user");
const expenseRouter = require("./routes/expense")
const paymentRouter = require("./routes/order");
const premiumRouter = require("./routes/premium")
const passwordRoute = require("./routes/forgetPassword")

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

app.use("/user", userRouter);
app.use("/expense",expenseRouter)
app.use("/order",paymentRouter)
app.use("/premium",premiumRouter)
app.use("/password",passwordRoute)


sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log("server running at 3000");
        });
    })
    .catch(error => {
        console.error('Failed to sync database:', error);
    });

