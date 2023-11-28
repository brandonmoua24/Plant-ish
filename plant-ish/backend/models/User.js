const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
    },
    update_date: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;

        if (this.isModified('confirmpassword')) {
            const hashedConfirmPassword = await bcrypt.hash(this.confirmpassword, salt);
            this.confirmpassword = hashedConfirmPassword;
        }

        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
