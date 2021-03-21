const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const usersRouter = require("./routers/users");
const booksRouter = require("./routers/books");

const app = express();
const PORT = process.env.PORT || 5000;


const PATH="mongodb+srv://pavan:uupd1348@cluster0.nogko.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(PATH, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.listen(PORT, () => console.log(`Server up on port ${PORT}`));