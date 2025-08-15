// taskModel.js
const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema(
    {
        // Title of the task
        title: {
            type: String,
            required: [true, 'Please provide a task title'] // Validation: title is required
        },
        // Detailed description of the task
        description: {
            type: String,
            required: [true, 'Please provide task description'] // Validation: description is required
        },
        // Tag to categorize the task
        tag: {
            type: String,
            enum: ['Important', 'Urgent', 'Later'], // Only allows these three values
        },
        // Reference to the user who created the task
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'user', // References the User model
            required: [true, 'Please provide a name'] // Validation: must provide a user
        }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the Task model
module.exports = mongoose.model('Tasks', taskSchema);
