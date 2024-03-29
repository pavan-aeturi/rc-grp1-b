const express = require("express");
const User = require("../models/user");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
	res.send(req.user);
});

router.post("/", async (req, res) => {
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		...req.body,
	});

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.post("/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();

		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

router.post("/logoutAll", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.phone,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.status(400).send();
	}
});


router.patch("/wishlist",auth,async(req,res)=>{
	try{
	const bId=req.body.id;
	const user=req.user;
	user.wishlist.push(bId);
	await user.save()
	res.status(200).send(user.wishlist)
	}
	catch(e)
	{
		res.status(400).send(e)
	}

});

router.get("/wishlist",auth,async(req,res)=>{
	try{
		res.send(req.user.wishlist);
	}
	catch(e)
	{
		res.status(400).send(e);
	}
})

router.get("/:id", async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id);

		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});



router.patch("/me",auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "phone", "password"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		const user = await User.findById(req.user._id);

		updates.forEach((update) => (user[update] = req.body[update]));
		await user.save();

		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete("/:id",auth, async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.user._id);

		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;