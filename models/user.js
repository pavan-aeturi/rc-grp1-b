const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		unique: true,
		required: true,
		minlength: 10,
		maxlength: 10,
		validate(value) {
			if (!validator.isNumeric(value)) {
				throw new Error("invalid number");
			}
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 4,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
	wishlist:[
		{
			book:{
				type:mongoose.Schema.Types.ObjectId,
			}
		}
	],
	address:{
		type: String,
	},
	emailID:{
		type: String,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("invalid email");
			}
		},
	}
});

userSchema.virtual('books',{
	ref: 'Book',
	localField:'_id',
	foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
	const user = this;	
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign(
		{ _id: user._id.toString() },
		"readingcoursegroupone"
	);

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token;
};

userSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

userSchema.statics.findByCredentials = async (phone, password) => {
	const user = await User.findOne({ phone });

	if (!user) {
		throw new Error("Unable to login");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Unable to login");
	}

	return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;