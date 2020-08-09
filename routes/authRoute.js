const router = require('express').Router()

const signupValidator = require('../validator/auth/signupValidator')
const loginValidator = require('../validator/auth/loginValidator')

const {
  singupGetController,
  singupPostController,
  loginGetController,
  loginPostController,
  logoutController,
  changePasswordGetController,
  changePasswordPostController
} = require("../controllers/authController");

const {isUnAuthenticated, isAuthenticated} = require('../middleware/authMiddleware')



router.get('/signup', isUnAuthenticated, singupGetController)
router.post('/signup', isUnAuthenticated, signupValidator, singupPostController)

router.get('/login', isUnAuthenticated, loginGetController)
router.post('/login', isUnAuthenticated, loginValidator, loginPostController)

router.get('/change-password', isAuthenticated, changePasswordGetController)
router.post('/change-password', isAuthenticated, changePasswordPostController)

router.get('/logout', logoutController)

module.exports = router