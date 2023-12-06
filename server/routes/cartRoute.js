const router = require("express").Router();
const Course = require("../models").course;
const User = require("../models").user;
let mongoose = require("mongoose");
router.use((req, res, next) => {
  console.log("正在接收購物車有關的請求");
  next();
});

//使用者購物車內容 app->course->cart
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundUser = await User.findOne({ _id })
      .populate("cartlist")
      .populate("enrolllist")
      .exec();

    return res.status(200).send({ user: foundUser });
  } catch (e) {
    return res.send(e);
  }
});

//加入購物車
router.post("/:_id", async (req, res) => {
  let { _id } = req.params;
  let userId = req.user._id.toString();
  try {
    let foundCourse = await Course.findOne({ _id });
    let foundUser = await User.findOne({ _id: userId })
      .populate("cartlist")
      .populate("enrolllist")
      .exec();
    if (!foundCourse) return res.send({ message: "查無課程" });
    if (!foundUser) return res.send({ message: "查無使用者" });

    foundUser.cartlist.push(foundCourse);
    let newUser = await foundUser.save();

    return res.send({
      message: "加入成功",
      user: newUser,
    });
  } catch (e) {
    return res.send(e);
  }
});

//修改購物車
router.patch("/:_id", async (req, res, next) => {
  let { _id } = req.params;
  let validId = mongoose.isValidObjectId(_id);

  if (validId) {
    try {
      let foundUser = await User.findOne({ _id: req.user._id }).exec();
      let userCart = foundUser.cartlist;
      let newCart = userCart.filter((c) => c != _id);
      let updateUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { cartlist: newCart },
        { new: true }
      );
      console.log(updateUser);
      return res.send({ user: updateUser });
    } catch (e) {
      return res.send(e);
    }
  } else {
    next();
  }
});
//註冊課程
router.post("/enroll", async (req, res) => {
  let userId = req.user._id;
  req.user.cartlist.map((c) => req.user.enrolllist.push(c));
  req.user.cartlist = [];
  try {
    let response = await req.user.save();
    res.send({ message: "註冊成功", user: response });
  } catch (e) {
    return res.send(e);
  }

  /*
  let foundUser = await User.findOne({ _id: userId });
  if (!foundUser) return res.status(401).send({ message: "查無使用者" });*/
  /*
  try {
    let foundCourse = await Course.findOne({ _id: courseId });
    if (foundCourse && foundUser) {
      foundCourse.student.push(userId);
      foundUser.enrolllist.push(courseId);
      //移除購物車資料
      foundUser.cartlist = [];
    }
    return res.send({ message: "註冊成功" });
  } catch (e) {
    console.log(e);
  }*/
});
module.exports = router;
