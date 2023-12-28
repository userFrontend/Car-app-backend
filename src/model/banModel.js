const mongoose = require('mongoose');


const banSchema = new mongoose.Schema({
   ban: {
    typeof: Array
   }
},
{timestamps: true},
)

module.exports = mongoose.model("Ban", banSchema)