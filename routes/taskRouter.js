// taskRouter.js
const express = require('express');
const router = express.Router();

// Import controller functions for task CRUD operations
const {
    createTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controller/taskController');

// Route for creating a new task and fetching all tasks for the authenticated user
router.route('/')
    .post(createTask)  // Create a new task
    .get(getTasks);    // Get all tasks for the user

// Routes for operations on a single task (identified by taskId)
router.route('/:taskId') // Use taskId to match controller parameters
    .get(getTask)         // Get a single task
    .patch(updateTask)    // Update a task
    .delete(deleteTask);  // Delete a task

// Export the router to use in index.js
module.exports = router;
