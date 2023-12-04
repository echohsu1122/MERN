const router = require("express").Router();

const passport = require("passport");
require("../config/passport")(passport);
require("../config/googlepassport")(passport);

const jwt = require("jsonwebtoken");

//google
const CLIENT_URL = "https://mern-bice-eight.vercel.app";

router.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://mern-bice-eight.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  console.log("正在接收google auth的請求");
  next();
});
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
router.get(
  "/google/redirect",
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

router.get("/login/success", (req, res) => {
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
router.get("/login/failed", (req, res) => {
  res.status(401).json({ error: true, message: "Log in failure" });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect(CLIENT_URL);
  });
});

module.exports = router;
