const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 40,
        required: true,
        trim: true
    },
    description: {
        type: String,
        maxlength: 500,
        required: false,
        trim: true,
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["snacks", "main_course"],
        required: true,
        trim: true
    },
    isVeg: {
        type: Boolean,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", ProductSchema);