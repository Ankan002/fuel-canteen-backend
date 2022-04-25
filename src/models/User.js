const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 40,
        minlength: 3,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    providerId: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);