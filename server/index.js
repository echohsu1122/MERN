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
const options = [
  cors({
    origin: "https://mern-bice-eight.vercel.app",
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
];
app.use(options);

app.use("/user", authRoute);
app.use("/course", courseRoute);
app.use("/cart", passport.authenticate("jwt", { session: false }), cartRoute);
app.get("/", (Req, res) => {
  res.send("hello vercel");
});
app.listen(8080, () => {
  console.log("server on port 8080");
});
