const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

// Fetch user profile info
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('username email bio favoriteGenres');
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ err: 'User not found' });
        }
        res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: 'Something went wrong' });
    }
};

// Edit user profile
const updateProfile = async (req, res) => {
    try {
        const { username, email, bio, favoriteGenres } = req.body;

        // Check if email is already taken by another user
        if (email) {
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== req.user.userId) {
                return res.status(StatusCodes.BAD_REQUEST).json({ err: 'Email is already in use' });
            }
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { username, email, bio, favoriteGenres },
            { new: true, runValidators: true }
        );
        res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: 'Error updating profile' });
    }
};

// Change password
const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        return res.status(StatusCodes.BAD_REQUEST).json({ err: 'Incorrect old password' });
    }

    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Password updated successfully' });
};

// Delete account
const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.userId);
        res.status(StatusCodes.OK).json({ msg: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: 'Error deleting account' });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    updatePassword,
    deleteAccount,
};
