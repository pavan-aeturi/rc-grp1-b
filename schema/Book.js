const mongoose = require('mongoose')
const bookSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    // photo: Buffer,
    // Owner: mongoose.Types.ObjectId,
    price: Number
    // tags: [String],
    // dateOfUpload: Date,
    // location: String,
    // description: String,
    // isActive: Boolean,
    // Number_of_Views: Integer
})

module.exports=mongoose.model('Book',bookSchema);