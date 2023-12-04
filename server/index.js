const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/authRoute");
const courseRoute = require("./routes/couresRoute");
const cartRoute = require("./routes/cartRoute");
const googleRoute = require("./routes/googleRoute");
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
/*
const options = [
  cors({
    origin: ["https://mern-bice-eight.vercel.app"],
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
];
app.use(options);
*/
const corsConfig = {
  origin: ["https://mern-bice-eight.vercel.app"],
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

app.use("/user", authRoute);
app.use("/auth", googleRoute);
app.use("/course", courseRoute);
app.use("/cart", passport.authenticate("jwt", { session: false }), cartRoute);
app.get("/", (req, res) => {
  res.send("hello vercel");
});

//google
/*
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
app.get(
  "/auth/google/redirect",
  passport.authenticate(
    "google",
    {
      failureRedirect: CLIENT_URL + "/login/failed",
    },
    (req, res) => {
      res.redirect(CLIENT_URL);
    }
  )
);

app.get("/login/success", (req, res) => {
  console.log("login success ");
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    let user = req.user;
    const tokenObj = { _id: user._id, email: user.email };
    const token = jwt.sign(tokenObj, process.env.PASSPORT_SECRET);
    return res.send({ loginSuccess: true, token: token, user });
  } else {
    console.log("not auth");
    return res.send({
      loginSuccess: false,
    });
  }
});
app.get("/login/failed", (req, res) => {
  res.status(401).json({ error: true, message: "Log in failure" });
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect(CLIENT_URL);
  });
});
*/
app.listen(8080, () => {
  console.log("server on port 8080");
});
