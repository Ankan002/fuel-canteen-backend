const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "online"],
        required: true
    },
    razorPayPaymentId: {
        type: String,
        required: false
    },
    razorPayOrderId: {
        type: String,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model("Order", OrderSchema);