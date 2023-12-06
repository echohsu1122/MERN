const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/authRoute");
const courseRoute = require("./routes/couresRoute");
const cartRoute = require("./routes/cartRoute");

const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const CLIENT_URL = "https://mernfrontend-3koa.onrender.com";
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("成功連接資料庫");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use("/user", authRoute);
app.use("/course", courseRoute);
app.use("/cart", passport.authenticate("jwt", { session: false }), cartRoute);

app.listen(8080, () => {
  console.log("server on port 8080");
});
