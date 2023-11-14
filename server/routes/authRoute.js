const router = require("express").Router();
const User = require("../models").user;
const Token = require("../models").token;
const registerVaildation = require("../vaildation").registerVaildation;
const loginVaildation = require("../vaildation").loginVaildation;

const passport = require("passport");
require("../config/passport")(passport);
require("../config/googlepassport")(passport);

const jwt = require("jsonwebtoken");
const Joi = require("joi");
const sendEmail = require("../sendEmail");

//google
const CLIENT_URL = "https://mern-coolschool.vercel.app/";

router.use((req, res, next) => {
  console.log("正在接收auth的請求");
  next();
});

//login
router.post("/login", async (req, res) => {
  let { error } = loginVaildation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email })
    .populate("cartlist")
    .populate("enrolllist")
    .exec();
  if (!user) return res.status(401).send("此信箱尚未註冊過");

  user.comparePassword(req.body.password, (err, isMath) => {
    //err==null or e
    if (err) return res.status(500).send(err);
    //comparePassword 會回傳true or false
    //輸入正確的密碼，加入jwt token 回傳給瀏覽器
    if (isMath) {
      //登入正確時 給予jwt token 存在localstorge
      const tokenObj = { _id: user._id, email: user.email };
      const token = jwt.sign(tokenObj, process.env.PASSPORT_SECRET);
      return res.send({
        message: "登入成功",
        token: "JWT " + token,
        user,
      });
    } else {
      return res.status(401).send("密碼輸入錯誤");
    }
  });
});

//register
router.post("/register", async (req, res) => {
  //傳遞內容需要經過驗證，是否符合schema資格
  let { error } = registerVaildation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //確認信箱是否有使用過
  const emailExist = await User.findOne({ email: req.body.email }).exec();
  if (emailExist) return res.status(400).send("此信箱已經註冊過了");

  //新增使用者
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ username, email, password });

    //在save()之前會進入pre() 裡面設定的middleware 做判斷
    let saveUser = await newUser.save();

    return res.send({
      msg: "使用者儲存成功",
      saveUser,
    });
  } catch (e) {
    return res.status(500).send("無法儲存");
  }
});

//reset pwd 尚未完成
router.post("/reset", async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) return res.status(400).send("查無使用者");

    let token = await Token.findOne({ userId: foundUser._id });
    if (!token) {
      const tokenObj = { _id: foundUser._id, email: foundUser.email };
      token = await new Token({
        userId: foundUser._id,
        token: jwt.sign(tokenObj, process.env.PASSPORT_SECRET, {
          expiresIn: "1d",
        }),
      }).save();
    }
    const link = `http://localhost:5173/user/reset/${foundUser._id}/${token.token}`;
    await sendEmail(foundUser.email, "密碼變更通知信", link);
    return res.send(link);
  } catch (e) {
    console.log(e);
  }
});

router.post("/reset/:_id/:token", async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().min(6).required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const foundUser = await User.findOne({ _id: req.params._id });
    if (!foundUser) return res.status(400).send("無效的連結");

    let token = await Token.findOne({
      userId: foundUser._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("無效的連結");

    foundUser.password = req.body.password;
    await foundUser.save();
    await token.deleteOne();
    return res.send({ message: "密碼修改成功", foundUser });
  } catch (e) {
    console.log(e);
  }
});

//google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
router.get(
  "/auth/google/redirect",
  passport.authenticate("google", {
    successMessage: "登入成功",
    successRedirect: CLIENT_URL,
    failureRedirect: CLIENT_URL + "login/failed",
  })
);

router.get("/login/success", (req, res) => {
  if (req.isAuthenticated()) {
    let user = req.user;
    const tokenObj = { _id: user._id, email: user.email };
    const token = jwt.sign(tokenObj, process.env.PASSPORT_SECRET);
    return res.send({ message: "成功登入", token: token, user });
  } else {
    console.log("not auth");
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
//update password //根據使用者id修改密碼
//需要經過passport-jwt驗證才可以修改 就是要驗證jwttoken
//如果是忘記密碼而需要修改密碼時就沒辦法經過驗證了，id也沒辦法取得
//只能用信箱查詢//如果只要知道信箱就可以改密碼也太智障了吧哈哈哈
/*
router.patch("/reset", async (req, res) => {
  let email = req.body.email;
  const userExist = await User.findOne({ email }).exec();
  if (!userExist) return res.status(400).send("查無此用戶");
  let _id = userExist._id;

  try {
    //Document change in MongoDB NOT IN MONGOOSE
    await User.updateOne({ _id }, { password: req.body.password });
    //This will update `doc` password to `req.body.password`, even though the doc changed.
    userExist.password = req.body.password;
    let updateUser = await userExist.save();

    return res.send({
      message: "密碼修改成功",
      updateUser,
    });
  } catch (e) {
    return res.status(500).send("無法儲存");
  }
});
*/
//delete account //刪除帳號的話要連課程也一起刪除耶

/*
router.get("/testApi", (req, res) => {
  return res.send("成功連接使用者路由");
});*/

module.exports = router;
