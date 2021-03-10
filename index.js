const mongoose=require('mongoose')
const express=require('express')
const Book=require('./schema/Book')
const User=require('./schema/User')
const app=express()
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

const PATH='mongodb+srv://pavan:'+process.env.MONGO_ATLAS_PW+'@cluster0.nogko.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(PATH,{useNewUrlParser:true,useUnifiedTopology: true });

app.post('/Book', (req,res,body)=>{
  
    const book=new Book({
    _id: new mongoose.Types.ObjectId(),
    Name:req.params.Name,
    price: req.params.price
   
    });
     book.save().then(r=>{
        console.log(r);
        
    }).catch(err=>{
        console.log(err);
    })
    res.status(200).json({
     "message":"OK"
    });
})

app.post('/User', (req,res,body)=>{
  console.log(req.query.Mobile);
    const user=new User({
    _id: new mongoose.Types.ObjectId(),
    Name:req.query.Name,
    Mobile: req.query.Mobile
   
    });
     user.save().then(r=>{
        console.log(r);
        
    }).catch(err=>{
        console.log(err);
    })
    res.status(200).json({
     "message":"OK"
    });
})