const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    require: true,
    maxlength: 20,
  },
  description: {
    type: String,
    require: true,
    minlength: 5,
  },
  price: {
    type: String,
    require: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  student: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Course", courseSchema);
