const mongoose = require('mongoose');


const banSchema = new mongoose.Schema({
   ban: {
    type: Array,
    default: []
   }
},
{timestamps: true},
)

module.exports = mongoose.model("Ban", banSchema)