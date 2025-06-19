import express from 'express';
import {
  createTask,
  getUserTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router();

router.post('/', protect, createTask);           // Create task
router.get('/', protect, getUserTasks);          // Get all tasks
router.get('/:id', protect, getSingleTask);      // Get single task
router.put('/:id', protect, updateTask);         // Update task
router.delete('/:id', protect, deleteTask);      // Delete task

export default router;
