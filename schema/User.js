const mongoose = require('mongoose')
var mongooseTypePhone=require('mongoose-type-phone')
const userSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    // photo: Buffer,
    // Owner: mongoose.Types.ObjectId,
    Mobile: mongoose.SchemaTypes.Phone
    // tags: [String],
    // dateOfUpload: Date,
    // location: String,
    // description: String,
    // isActive: Boolean,
    // Number_of_Views: Integer
})

module.exports=mongoose.model('User',userSchema);