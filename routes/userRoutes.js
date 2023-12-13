const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/user/validateOTP', userController.validateOTPAndFetchUser);
router.put('/user/edit/:id', userController.editUserData);
router.put('/user/deleteField/:id', userController.deleteUserDataField);
router.delete('/user/deleteAll/:id', userController.deleteAllUserData);

module.exports = router;
