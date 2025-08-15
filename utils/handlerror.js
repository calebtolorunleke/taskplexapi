// Centralized error handler for all user-related operations

const handleError = (err) => {
    let errors = {};

    // Duplicate email error (MongoDB error code 11000)
    if (err.code === 11000) {
        errors.email = 'Email is already in use';
        return errors;
    }

    // Incorrect email (login)
    if (err.message === 'Incorrect email') {
        errors.email = 'This email has not been registered';
        return errors;
    }

    // Incorrect password (login)
    if (err.message === 'Incorrect password') {
        errors.email = 'Email or password is incorrect';
        errors.password = 'Email or password is incorrect';
        return errors;
    }

    // Mongoose validation errors (e.g., required fields, minlength, invalid email)
    if (err.message && err.message.includes('')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    }

    // Mongoose CastError (invalid ObjectId)
    if (err.name === 'CastError') {
        errors.general = 'Invalid data format';
        return errors;
    }

    // Default: return the original error message in a generic field
    errors.general = err.message || 'Something went wrong';
    return errors;
};

module.exports = handleError;
