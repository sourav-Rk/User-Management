const express  = require('express');
const router = express();

const userController = require('../controller/userController');
const userAuth = require('../middleware/Auth');



router.get('/',userAuth.isAdmin,userAuth.isLogout, userController.loadLogin);
router.post('/',userController.verifyLogin);

router.get('/register',userAuth.isAdmin,userAuth.isLogout, userController.loadRegister)
router.post('/register',userController.insertUser);

router.get('/home',userAuth.isLogin, userController.loadHome);
router.get('/logout',userController.logout);

module.exports=router;