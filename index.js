require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;
const conString = process.env.conString;

// Routers
const userRouter = require('./routes/userrouter');
const auth = require('./middleware/authentication');
const taskRouter = require('./routes/taskRouter');
const pagenotfound = require('./utils/pagenotfound');

// Parse incoming JSON requests through Middleware
app.use(express.json());

// Public routes for user registration & login
app.use('/api/v1/user', userRouter);

// Protected routes for task CRUD (requires authentication)
app.use('/api/v1/task', auth, taskRouter);

// Catch-all 404 handler
app.use(pagenotfound);

//  Start Server 
const startServer = async () => {
    try {
        await mongoose.connect(conString);
        console.log('My Mongo Database connected successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}...`);
        });
    } catch (error) {
        console.error('Database connection error:', error.message);
    }
};

startServer();
