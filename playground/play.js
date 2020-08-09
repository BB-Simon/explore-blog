const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const Flash = require('../utils/Flash')


const upload = require('../middleware/uploadMiddleware')


router.get("/play", (req, res) => {
  res.render("playground/play", { title: "playground", flashMessage: {} });
});

router.post('/play', upload.single('my-file'), (req, res, next)=>{

  if(req.file){
    console.log(req.file);
    
  }
  res.redirect('/playground/play')
})


// router.post(
//   "/play",
//   [
//     check("username")
//       .not()
//       .isEmpty()
//       .withMessage('Username can\'t be empty')
//       .isLength({ max: 15 })
//       .withMessage("Username can't grater then 15 charecters")
//       .trim(),
//     check("email").isEmail().withMessage("Please provide a valid email")
//     .normalizeEmail(),
//     check('password').custom(value =>{
//       if(value.length < 5){
//         throw new Error('Paasword must be grater then 5 charecters')
//       }
//       return true
//     }),
//     check('confirmPassword').custom((value, {req})=>{
//       if(value !== req.body.password){
//         throw new Error('Password doesn\'t match')
//       }
//       return true
//     })
//   ],
//   (req, res) => {
//     let errors = validationResult(req);

    // let formator = err => err.msg
    // console.log(errors.isEmpty());
    // console.log(errors.mapped());
    // console.log(errors.array());

    // console.log(errors.formatWith(formator).mapped());
    
    // console.log(req.body.username, req.body.email);
    
    // res.render("playground/signup", { title: "validator play gound" });

//   if(!errors.isEmpty()){
//     req.flash('fail', 'There is some error')
//   } else {
//     req.flash('success', 'There is no errors')
//   }
//   res.redirect('/playground/validator')



//   }
// );

module.exports = router
