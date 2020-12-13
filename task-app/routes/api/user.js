const express = require('express');
const router = express.Router();

const UserController = require('../../app/Http/Controllers/UserController');
const { Auth } = require('../../app/Http/Middleware/Auth');

router.use(Auth);

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);

module.exports = router;
