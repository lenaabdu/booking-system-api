const mongoose = require('mongoose');


const reserveSchema = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    table: String,
    size: String,
    dieteryRequirements: String

})

module.exports.reserve = mongoose.model('reserve', reserveSchema)