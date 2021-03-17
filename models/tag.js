const mongoose=require('mongoose');

const tagSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
		type: String,
        required: true
	},
    books:[
        {
            book:{
             type: mongoose.Schema.Types.ObjectId,
             ref: "Book"
            }
        }
          ]
})
const Tag=mongoose.model("Tag",tagSchema);
module.exports=Tag;
