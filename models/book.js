const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
		type: String,
		required: true,
	},
    photo: {
		type: Buffer,
		//required: true,
	},
    owner:  {
		type:  mongoose.Schema.Types.ObjectId,
		required: true,
        ref: 'User'
	},
    price:{ 
        type: Number,
        default: 0
    },
    tags:[
        {
            tagID:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Tag'
            },
            name:{
                type: String
            }
        }
    ],
    dateOfUpload: {
        type: Date,
        default: Date.now()
    },
    location: {
        type:String
    },
    description:{
        type:String
    },
    isActive:{
        type:Boolean,
        default: true
    },
    Number_of_Views: {
        type: Number
    }
});



const Book = mongoose.model("Book", bookSchema);

module.exports=Book;