const TaskData = require('../model/taskModel');
const handleError = require('../utils/handlerror');

// Create a new task for logged in user
const createTask = async (req, res) => {
    const { userId } = req.user; // userId added by auth middleware
    req.body.createdBy = userId; // associate task with the logged-in user

    try {
        const task = await TaskData.create(req.body); // create task in my DB
        res.status(201).json({ success: true, task });
    } catch (error) {
        // Centralized error handling
        const errors = handleError(error);
        res.status(400).json({ success: false, errors });
    }
};


// Get all tasks for the logged in user
const getTasks = async (req, res) => {
    const { userId } = req.user;

    try {
        const tasks = await TaskData.find({ createdBy: userId }); // fetch tasks by user
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        // Centralized error handling
        const errors = handleError(error);
        res.status(400).json({ success: false, errors });
    }
};


// Get a single task by taskId for the logged in user 
const getTask = async (req, res) => {
    const { userId } = req.user;
    const { taskId } = req.params;

    try {
        const task = await TaskData.findOne({ createdBy: userId, _id: taskId });
        res.status(200).json({ success: true, task });
    } catch (error) {
        // Centralized error handling
        const errors = handleError(error);
        res.status(400).json({ success: false, errors });
    }
};


// Update a task by taskId for the logged-in user
const updateTask = async (req, res) => {
    const { userId } = req.user;
    const { taskId } = req.params;

    try {
        const task = await TaskData.findOneAndUpdate(
            { createdBy: userId, _id: taskId },
            req.body,
            { new: true, runValidators: true } // return updated doc and run validations so as to return entire task with what was just updated
        );
        res.status(200).json({ success: true, task });
    } catch (error) {
        // Centralized error handling

        const errors = handleError(error);
        res.status(400).json({ success: false, errors });
    }
};


// Delete a task by taskId for the logged in user
const deleteTask = async (req, res) => {
    const { userId } = req.user;
    const { taskId } = req.params;

    try {
        await TaskData.findOneAndDelete({ createdBy: userId, _id: taskId });
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        // Centralized error handling

        const errors = handleError(error);
        res.status(400).json({ success: false, errors });
    }
};

module.exports = { createTask, getTask, getTasks, updateTask, deleteTask };
