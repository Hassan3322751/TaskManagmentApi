const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController')
const auth = require('../middleware/auth');

// Apply auth middleware to all routes in this file
router.use(auth);

// Dashboard stats (Specific route first)
router.get('/dashboard/stats', taskController.getDashboardStats);

// Standard CRUD
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
