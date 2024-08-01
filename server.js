require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const cors = require("cors");
const app = express();
const path = require('path');
app.use(cors());
app.use(express.json());

const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");
const premiumRouter = require("./routes/premiumRoutes");
const passwordRouter = require("./routes/passwordRoutes");
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/user", userRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/premium", premiumRouter);
app.use("/api/password", passwordRouter);

const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/orders");
const ForgotPasswordRequest = require("./models/forgotPasswordRequests");
const ReportHistory = require("./models/reportHistroy");

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

User.hasMany(ReportHistory);
ReportHistory.belongsTo(User);

const port = process.env.PORT || 3000;
const host = '0.0.0.0';
sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port,host, () => {
      console.log(`listening from http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
