const express = require("express");
require("dotenv").config();
const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT;
// const PORT = 3000;
console.log("PORT", PORT);

// MiddleWares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json()); // To parse json -- used to send json form request headers
app.use(cookieParser()); // to get cookie from request

//Routing Connections
app.use("/", authRouter);
app.use("/", profileRouter);

// Connect to DB and then connect to server
connectDB()
  .then(() => {
    console.log("MongoDB Database connected from Application..");
    app.listen(PORT, () => {
      console.log(`Server connected on ${PORT}.....`);
    });
  })
  .catch((err) => {
    console.log("Error in connecting to Database");
  });
