const {body} = require('express-validator')
const cheerio = require('cheerio')

module.exports = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title con't be empty")
    .isLength({ max: 100 })
    .withMessage("Title can't to be more 100 charecters")
    .trim(),
  body("body")
    .not()
    .isEmpty()
    .withMessage("Body con't be empty")
    .custom(value =>{
        let node = cheerio.load(value)
        let text = node.text()
        if(text.length > 5000){
            throw new Error("Body can't to be more 5000 charecters");
        }
        return true
    })
];