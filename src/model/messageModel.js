const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
},
{timestamps: true},
)

module.exports = mongoose.model("Message", messageSchema)