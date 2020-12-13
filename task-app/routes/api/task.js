const express = require('express');
const router = express.Router();

const TaskController = require('../../app/Http/Controllers/TaskController');
const Auth = require('../../app/Http/Middleware/Auth');

router.use(Auth);

router.get('/', TaskController.index);
router.post('/', TaskController.create);
router.get('/:id', TaskController.show);
router.get('/:id/user', TaskController.getUser);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

module.exports = router;
