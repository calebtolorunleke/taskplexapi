const User = require('../model/userModel')
const handleError = require('../utils/handlerror')


// user controller logic for user registration
const register = async (req, res) => {
    try {
        // If pre-validation, then I run
        const user = await User.create(req.body)
        res.status(201).json({ succcess: true, user })
    } catch (error) {
        const errors = handleError(error)
        res.status(400).json({ errors })
    }
}


// User controller logic for user login
const login = async (req, res) => {
    const { email, password } = req.body;

    // 1. Check if both email and password are provided in the request
    if (!email || !password) {
        return res.status(400).json({
            succcess: false,
            message: "Please provide necessary information"
        });
    }

    try {
        // 2. Find user by email
        const userExist = await User.findOne({ email });
        if (!userExist) {
            // If no user found, throw custom error handled by centralized error handler
            throw Error('Incorrect email');
        }

        // 3. Compare provided password with stored hashed password
        const authenticated = await userExist.comparePassword(password);
        if (!authenticated) {
            // If password doesn't match, throw custom error
            throw Error('Incorrect password');
        }

        // 4. Generate authentication token for the user
        const token = userExist.generateToken();

        // 5. Send success response with basic user details and token
        res.status(200).json({
            succcess: true,
            user: { userExist: userExist.name, email: userExist.email },
            token
        });

    } catch (error) {
        // 6. If any error occurs, pass it to centralized error handler for cleaner response
        const errors = handleError(error);
        res.status(400).json({ errors });
    }
};



module.exports = { register, login }