const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/all', taskController.getAllTasks);

router.get('/:id', taskController.getTaskById);

router.post(
  '/create',
  [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').optional(),
  ],
  taskController.createTask
);

router.put(
  '/assign/:id',
  [
    check('assignedTo').notEmpty().withMessage('AssignedTo is required'),
  ],
  taskController.assignTask
);

router.delete('/delete/:id', taskController.deleteTask);

router.put('/complete/:id', taskController.completeTask);

module.exports = router;
