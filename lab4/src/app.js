const express = require("express");
let app = express();
app.use(express.json());
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/../views/partials");
app.set("view engine", "hbs");

const validator = require("validator");


// schemas
const Task = require("../models/task");
const User = require("../models/user");

// routers
const taskRouter = require("../routers/task");
const userRouter = require("../routers/user");
app.use(taskRouter);
app.use(userRouter);


const mongoose = require("mongoose");
const uri = "mongodb+srv://admin:admin@cluster0.lgoujte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);

// cheat sheet
// cheat sheet
// cheat sheet
const dude = new User({
    name: "sunny",
    age: 19,
    email: "dude@gmail.com",
    password: "NotAPassword"
});
const ISaySo = false;
if (ISaySo){
    //save docs
    dude.save()
    .then( () => console.log ("dude entered the basement"))
    .catch(err => console.log(err));
    
    //get docs
    User.find()
    .then( () => console.log ("ur momma"))
    .catch(err => console.log(err));
}



// cheat sheet
// cheat sheet
// cheat sheet

app.get("/", (req,res) =>{
    res.render("index.hbs", {});
});
app.get("/create", (req,res) =>{
    res.render("create.hbs", {});
});
app.get("/update", async (req,res) =>{
    let users = [];
    let tasks = [];
    await User.find()
    .then( result => users = result)
    .catch(err => console.log(err));
    await Task.find()
    .then( result => tasks = result)
    .catch(err => console.log(err));

    console.log(users);
    res.render("update.hbs", {users, tasks});
});
app.get("/delete", async (req,res) =>{
    let users = [];
    let tasks = [];
    await User.find()
    .then( result => users = result)
    .catch(err => console.log(err));
    await Task.find()
    .then( result => tasks = result)
    .catch(err => console.log(err));

    console.log(users);
    res.render("delete.hbs", {users, tasks});
});

app.listen(3000, () => {console.log("The app listens!!!!")});