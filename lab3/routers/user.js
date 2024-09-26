const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.use(express.urlencoded({extended: true}));


// GET
// GET
// GET
router.get("/users", (req,res) =>{
    User.find()
    .then( result => res.send(result))
    .catch(err => console.log(err));
});

router.get("/users:id", (req,res) =>{
    let id = req.params.id;
    User.findById(id)
    .then( result => res.send(result))
    .catch(err => console.log(err));
});

// POST
// POST
// POST
router.post("/users", (req,res) =>{
    const user = new User(req.body);
    user.save()
    .then( () => res.redirect("/users"))
    .catch(err => console.log(err));
});

// PUT
// PUT
// PUT
// posts for frontend forms
router.post("/users/update/:id", (req,res) =>{
    const id = req.params.id;
    const user = req.body;
    User.findByIdAndUpdate(id, user)
    .then( result => res.redirect("/update"))
    .catch(err => console.log(err));
});

router.put("/users/:id", (req,res) =>{
    const id = req.params.id;
    const user = req.body;
    User.findByIdAndUpdate(id, user)
    .then( result => res.send(result))
    .catch(err => console.log(err));
});

// DELETE
// DELETE
// DELETE
router.delete("/users", (req,res) =>{
    const userId = req.body.id;
    User.findByIdAndDelete(userId)
    .then( result => res.send(result))
    .catch(err => console.log(err));
});


// the post handlers are meant for the silly forms frontend
router.post("/users/delete/:id", (req,res) =>{
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then( result =>  res.redirect("/delete"))
    .catch(err => console.log(err));
});
router.delete("/users/:id", (req,res) =>{
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then( result =>  res.redirect("/users"))
    .catch(err => console.log(err));
});

module.exports = router;