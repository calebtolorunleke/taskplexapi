// userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator'); // For validating email format
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

// Define the User schema
const userSchema = new Schema(
    {
        // Full name of the user
        name: {
            type: String,
            required: [true, 'Please provide a name'] // Validation: name is required
        },
        // User email
        email: {
            type: String,
            required: [true, 'Please provide an email'], // Validation: email is required
            unique: true, // Ensures no duplicate emails
            validate: [isEmail, 'Please provide a valid email address'] // Validates proper email format
        },
        // Password
        password: {
            type: String,
            required: [true, 'Please provide a password'], // Validation: password is required
            minlength: [7, 'The minimum password length is 7'] // Minimum password length
        }, role: {
            type: String,
            enum: ["user", "admin"], // default roles
            default: "user",
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Pre-save middleware to hash passwords before saving to DB
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (userPassword) {
    const isCorrect = await bcrypt.compare(userPassword, this.password);
    return isCorrect;
};

// Method to generate JWT token for authentication
userSchema.methods.generateToken = function () {
    return jwt.sign(
        { userId: this._id, name: this.name, role: this.role }, // Payload
        process.env.jwt_secret, // Secret key from .env
        { expiresIn: '1d' } // Token expiration
    );
};

// Export the User model
module.exports = mongoose.model('User', userSchema);
