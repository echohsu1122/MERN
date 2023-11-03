const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");

const userSchema = new Schema({
  googleId: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    require: true,
    minlength: 6,
    maxlength: 100,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    maxlength: 255,
  },
  cartlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  enrolllist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

//可以建立 user methods
userSchema.methods.comparePassword = async function (password, cb) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    //回傳一個帶有null值與結果
    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
};
//The save() function triggers validate() hooks, because mongoose has a built-in pre('save') hook that calls validate(). This means that all pre('validate') and post('validate') hooks get called before any pre('save') hooks.
//在儲存之前經過的middleware，處理密碼
userSchema.pre("save", async function (next) {
  console.log(this.googleId);
  if (this.googleId == null)
    if (this.isNew || this.isModified("password")) {
      const hashValue = await bcrypt.hash(this.password, 10);
      this.password = hashValue;
    }
  next();
});
module.exports = mongoose.model("User", userSchema);
