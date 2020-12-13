const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const taskRoutes = require('./task');
const authRoutes = require('./auth');

router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
