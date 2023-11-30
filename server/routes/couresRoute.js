const router = require("express").Router();
const Course = require("../models").course;

const courseVaildation = require("../vaildation").courseVaildation;

const passport = require("passport");
require("../config/passport")(passport);

router.use((req, res, next) => {
  console.log("正在接收課程有關的請求");
  res.append("Access-Control-Allow-Origin", [
    "https://mern-bice-eight.vercel.app/",
  ]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//搜尋所有課程:訪客
router.get("/", async (req, res) => {
  try {
    let foundCoures = await Course.find({}).exec();
    return res.json(foundCoures);
  } catch (error) {
    return res.send({ error: error.response.data });
  }
});
//以下都需要身分驗證
//根據user id 搜尋
//訪客也可以加入購物車但在註冊那邊要進行身分驗證
//根據課程id 加入購物車

//根據使用者id搜尋的課程
router.get(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { _id } = req.params;
    try {
      let founcourse = await Course.find({ instructor: _id });
      return res.send({ course: founcourse });
    } catch (e) {
      return res.send(e);
    }
  }
);
//新稱課程
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { error } = courseVaildation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
      let { title, description, price } = req.body;
      let newCourese = new Course({
        title,
        description,
        price,
        instructor: req.user.id,
      });
      let saveCourse = await newCourese.save();

      return res.send({ message: "課程儲存成功", saveCourse });
    } catch (e) {
      return res.status(500).send(e.response.data);
    }
  }
);

//根據課程id 修改課程
router.patch(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { error } = courseVaildation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let { _id } = req.params;
    const foundCourse = await Course.findOne({ _id }).where(
      "instructor",
      req.user.id
    );
    if (!foundCourse) return res.status(400).send("查無課程");

    try {
      if (foundCourse) {
        let updateCourse = await Course.findOneAndUpdate({ _id }, req.body, {
          new: true,
          runValidators: true,
        });

        /*
        //原本寫foundCourse = req.body 會跳錯誤無法修改但實際上已經修改好了
        foundCourse.title = req.body.title;
        foundCourse.description = req.body.description;
        foundCourse.price = req.body.price;
        let updateCourse = await foundCourse.save();*/

        return res.send({ message: "課程修改成功", updateCourse });
      } else {
        return res.status(403).send("沒有此課程權限修改");
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }
);
//刪除課程
router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let { _id } = req.params;

    const foundCourse = await Course.findOne({ _id }).where(
      "instructor",
      req.user.id
    );

    if (!foundCourse) return res.status(400).send("查無課程");

    if (foundCourse) {
      let deleteCourse = await Course.deleteOne({ _id }).exec();
      return res.send({ message: "課程刪除成功", deleteCourse });
    } else {
      return res.status(403).send("沒有此課程權限修改");
    }
  }
);

module.exports = router;
