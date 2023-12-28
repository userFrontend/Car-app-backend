const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 100,
        enum: [100, 101], // 100 - user , 101 - admin
    },
    phoneNumber: {
        type: Number,
        default: null,
        required: true,
    },
    avatar: {
        type: Object,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{timestamps: true},
)

module.exports = mongoose.model("User", userSchema)