const express = require('express');
const router = express.Router();

const AuthController = require('../../app/Http/Controllers/AuthController');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.put('/change-password', AuthController.changePassword);

module.exports = router;
