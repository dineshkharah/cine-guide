const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({ user: { username: user.username }, token });
    } catch (error) {
        console.error('Error during registration:', error); // Log the error to the console
        if (error.name === 'ValidationError') {
            return res.status(StatusCodes.BAD_REQUEST).json({ err: error.message });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: 'Something went wrong, please try again later.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid Credentials' });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid password' });
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
};

module.exports = {
    register,
    login
};
