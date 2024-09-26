const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

router.use(express.json());



// lab5 testing
router.get("/user/tasks", auth, async(req,res) => {
    const user = await User.findById(req.user._id);
    await user.populate("tasks");
    res.send(user);
});

// auth
router.get("/users/me", auth, async(req, res) => {

    res.send(req.user);
    
})

router.post("/users/login", async (req, res) =>{
    try{
        const user = await User.findOneByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch (e){
        console.log(e);
        res.status(400).send(e);
    }
});

router.post("/users/logout", auth, async (req, res) =>{
    try{
        req.user.tokens = req.user.tokens.filter(token =>(
            token.token != req.token
        ));
        await req.user.save();
        res.send();
    }catch (e){
        res.status(500).send(e);
    }
});
// auth

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
    User.findByIdAndDelete(id).then( () => {
        const user = new User(req.body);
        user.save()
        .then( () => res.redirect("/update"))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.put("/users/:id", (req,res) =>{
    const id = req.params.id;
    User.findByIdAndDelete(id).then(() => {
        const user = new User(req.body);
        user.save()
        .then( result => res.send(result))
        .catch(err => console.log(err));
    })
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