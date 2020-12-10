const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const taskRoutes = require('./task');
const authRoutes = require('./auth');

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/', authRoutes);

module.exports = router;
