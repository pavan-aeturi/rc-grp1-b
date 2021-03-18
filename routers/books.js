const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");
const Book=require("../models/book");
const mongoose=require("mongoose");
const Tag=require("../models/tag")

router.post("/",auth,async(req,res)=>{
		
	
		const book=new Book({
			_id: new mongoose.Types.ObjectId(),
			...req.body,
			owner: req.user._id
		})

		try{
		
		const tagIds=[]
		book.tags.forEach((tag)=>{
			tagIds.push(tag.tagID)
		})
		tagIds.forEach(async (tagID)=>{
			const tag=await Tag.findById(tagID)

			tag.books.push(book._id)
			await tag.save()
		})
		await book.save()
		res.status(201).send(book)
	}
	catch(e)
	{
		console.log(e)
		res.status(400).send(e)
	}
	
});

router.get("/getTags",auth,async(req,res)=>{
	try{
		const tags= await Tag.find({});
		res.status(200).send(tags);
	}
	catch(e)
	{
		res.status(400).send(e)
	}
});

router.post("/postTag",auth,async(req,res)=>{
	
		const m=req.body.name
		const tag=new Tag({
			_id:  new mongoose.Types.ObjectId(),
			name: m	
		})
		console.log(tag)
	try{
		await tag.save()
		res.status(200).send(tag);
	}
	catch(e)
	{
		res.status(500).send(e);
	}
})
router.get("/myBooks",auth,async(req,res)=>{
	try{
	const user= req.user;
	await user.populate('books').execPopulate()
	res.status(200).send(user.books)
	}
	catch(e)
	{
		res.status(500).send({msg:e})
	}
});

router.get("/getAds",auth,async(req,res)=>{
	try{
		
		const books= await Book.find({ isActive:true}, '_id name photo price').exec();
		res.status(200).send(books)
	}
	catch(e)
	{
		res.status(500).send({msg:e})
	}
});

router.patch("/:id",auth, async (req, res) => {
	
	try {
	
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "price", "tags","photo","isActive","location"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

		const book = await Book.findById(req.params.id);
		if(book.owner==req.user._id)
		{
			updates.forEach((update) => (book[update] = req.body[update]));
			await book.save();

			if (!book) {
				return res.status(404).send();
			}

			res.send(book);
		}
		else throw new Error("not the owner");

	} catch (e) {
		res.status(400).send(e);
	}
});

router.get("/search/",auth,async(req,res)=>{
	try{
		const books= await Book.find({isActive:true,name: { "$regex": req.body.name, "$options": "i" } ,},'_id name photo price').exec();
		
		if(books)
			res.status(200).send(books);
		else
			throw new Error("sorry no search results");
	}
	catch(e)
	{
		res.status(500).send({msg:e});
	}
})


router.get("/filter",auth,async(req,res)=>{
	try{
		
		let setOfBookIds=new Set();
		req.body.tags.forEach((tag)=>{
			tag.books.forEach(async (book)=>{
					setOfBookIds.add(book)
			})
		})
		let books=[]
		setOfBookIds.forEach(async (book) => {
			const b=await Book.findById(book)
			if(b.isActive)
				books.push(b)
		});
	
		res.status(200).send(books)
	}catch(e)
	{
		res.status(500).send(e)
	}
})
router.get("/location",auth,async(req,res)=>{
	try{
	const books=await Book.find({isActive:true,location:{ "$regex": req.body.location, "$options": "i" }},'_id name photo price location' ).exec()
	res.status(200).send(books)
	}
	catch(e)
	{
		res.status(500).send(e)
	}


});
router.get("/:id",auth,async(req,res)=>{
	try{
		const book=await Book.findById(req.params.id);

		if(book)
			res.status(200).send(book);
		else
			throw new Error("invalid book id")
	}
	catch(e){
		res.status(400).send(e)
	}
});

router.delete("/:id",auth,async(req,res)=>{
	try{
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).send();
		}
		
		if(book.owner.toString()===req.user._id.toString())
		{
			
			await Book.findOneAndDelete(req.params.id);
			res.send(book);
		}
		else
			res.status(505).send({msg:"bad request"})
		}
	catch(e)
	{
		res.status(500).send({msg:e})
	}
});


module.exports = router;