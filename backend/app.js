const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/database");
const cookieParser = require("cookie-parser")
const path = require("path")
const helmet = require("helmet")
const morgan = require("morgan")
const fs = require("fs")
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

const acessLog = fs.createWriteStream(path.join(__dirname ,"acess.log"),{
    flags : "a"
})

const PORT = process.env.PORT || 4000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("combined",{ stream : acessLog}));

app.use("/user", userRouter);
app.use("/expense",expenseRouter)
app.use("/order",paymentRouter)
app.use("/premium",premiumRouter)
app.use("/password",passwordRoute)


sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log("server running at PORT");
        });
    })
    .catch(error => {
        console.error('Failed to sync database:', error);
    });

