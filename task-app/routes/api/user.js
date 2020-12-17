const express = require('express');
const router = express.Router();

const UserController = require('../../app/Http/Controllers/UserController');
const AuthController = require('../../app/Http/Controllers/AuthController');
const Auth = require('../../app/Http/Middleware/Auth');

router.use(Auth);

router.get('/', UserController.index);
router.get('/profile', UserController.show);
router.put('/', UserController.update);
router.delete('/', UserController.delete);
router.put('/change-password', AuthController.changePassword);
router.get('/profile/tasks', UserController.getTasks);

module.exports = router;
