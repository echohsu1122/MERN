const Joi = require("joi");

const registerVaildation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(8).max(25).required(),
  });
  return schema.validate(data);
};
const loginVaildation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(8).max(25).required(),
  });
  return schema.validate(data);
};
const courseVaildation = (data) => {
  const schema = Joi.object({
    title: Joi.string().max(20).required(),
    description: Joi.string().min(5).required(),
    price: Joi.number().min(1).max(10000).required(),
  });
  return schema.validate(data);
};

module.exports.registerVaildation = registerVaildation;
module.exports.loginVaildation = loginVaildation;
module.exports.courseVaildation = courseVaildation;
