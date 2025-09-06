require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const incomeRoutes = require("./routes/incomeRoutes.js");
const expenseRoutes = require("../backend/routes/expenseRoutes.js");
const dashboardRoutes = require("../backend/routes/dashboardRoutes.js");

const app = express();
//Middleware to handle CORS

app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],
    })
);
connectDB();

app.use(express.json());



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

//Server  uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"))) ;

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));