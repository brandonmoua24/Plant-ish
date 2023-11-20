const mongoose = require('mongoose');

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
    roles: {
        type: Array, // or String depending on your implementation
        default: [], // adjust the default value as needed
    },
    update_date: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    try {
        return candidatePassword === this.password;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = User = mongoose.model('user', UserSchema);