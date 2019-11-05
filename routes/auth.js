const express = require('express');
const { registro, login, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/registro', registro);
router.post('/login', login);
router.get('/me', protect, getMe);




/*
router.post('/login', login);
router.get('/logout', logout);

router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);*/

module.exports = router;
