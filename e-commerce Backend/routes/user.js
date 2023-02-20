const express=require('express')
const router=express.Router()
const {signup,login,logout,forgetPassword,passwordReset,getLoggedInUserDetails}=require('../controllers/userController')
const { isLoggedIn } = require('../middlewares/user')


router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/forgotPassword').post(forgetPassword)
router.route('/password/reset/:token').post(passwordReset)
router.route('/userdashboard').get(isLoggedIn,getLoggedInUserDetails)

module.exports=router;