const {body} = require('express-validator')
const validator = require('validator')


const linkValidator = value => {
  if (value) {
    if (!validator.isURL(value)) {
      throw new Error("Please provide valid URL");
    }
  }
  return true
};

module.exports = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name con't be empty")
    .isLength({ max: 50 })
    .withMessage("Name can't to be more 50 charecters")
    .trim(),
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title con't be empty")
    .isLength({ max: 100 })
    .withMessage("Title can't to be more 100 charecters")
    .trim(),
  body("bio")
    .not()
    .isEmpty()
    .withMessage("Bio con't be empty")
    .isLength({ max: 500 })
    .withMessage("Bio can't to be more 500 charecters")
    .trim(),
  body("website").custom(linkValidator),
  body("facebook").custom(linkValidator),
  body("twitter").custom(linkValidator),
  body("github").custom(linkValidator),
];