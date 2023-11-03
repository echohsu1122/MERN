const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    expire: 3600,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
