const express = require('express');
const router = express();

const adminController = require('../controller/adminController');
const adminAuth = require('../middleware/adminAuth')

router.get('/',adminAuth.isUser,adminAuth.isLogout , adminController.loadLogin);
router.post('/',adminController.verifyLogin);

router.get('/dashboard',adminAuth.isNotLogin , adminController.loadDashboard);

router.post('/dashboard/add',adminController.addUser);

router.get('/dashboard/delete/:id',adminController.deleteUser);

router.post('/dashboard/edit',adminController.editUser);

router.get('/logout',adminController.logout);

module.exports = router;