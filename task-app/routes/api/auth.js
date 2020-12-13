const express = require('express');
const router = express.Router();

const AuthController = require('../../app/Http/Controllers/AuthController');
const Auth = require('../../app/Http/Middleware/Auth');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', Auth, (...args) => AuthController.logout(...args));

module.exports = router;
