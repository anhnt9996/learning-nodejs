const express = require('express');
const router = express.Router();

const UserController = require('../../app/Http/Controllers/UserController');
const AuthController = require('../../app/Http/Controllers/AuthController');
const Auth = require('../../app/Http/Middleware/Auth');

router.use(Auth);

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.put('/:id/change-password', AuthController.changePassword);
router.get('/:id/tasks', UserController.getTasks);

module.exports = router;
