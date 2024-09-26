const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const User = require("../models/user");


// lab5
const auth = require("../middleware/auth");
// lab5

router.use(express.json());

// GET
// GET
// GET
router.get("/task/:id", auth, async (req,res) =>{

    let id = req.params.id;
    try{
        const task = await Task.findById(id);
        if(task.owner == req.user.id){
            res.send(task);
        }else{
            console.log("dude")
            res.status(404).send();
        }
    }catch(e){
        console.log(e);
    }
});
router.get("/tasks", auth, async (req,res) =>{
    try{
        const user = await User.findById(req.user.id);
        await user.populate("tasks");
        res.send(user.tasks);
    }catch (e){
        console.log(e);
    }
});


// POST
// POST
// POST
// lab5
router.post("/tasks", auth,  async (req,res) =>{
    const task = new Task({
        ...req.body,
        owner: req.user.id
    });
    try{
        await task.save();
        res.status(201).send(task);
        res.redirect("/tasks");
    }catch (e){
        res.status(500).send(e);
    }
});

// PATCH (put)
// PATCH 
// PATCH 
// posts for frontend forms

router.post("/tasks/update/:id", async (req,res) =>{
    const id = req.params.id;
    const task = req.body;
    try{
        await Task.findByIdAndUpdate(id, task);
        res.redirect("/update");        
    }catch(e){
        console.log(e);
    }
});

router.put("/tasks/:id", auth, async (req,res) =>{
    const id = req.params.id;
    const task = req.body;
    if( req.user.id == task.owner){
        try{
            await Task.findByIdAndUpdate(id, task);
            res.redirect("/update");        
        }catch(e){
            console.log(e);
        }
    }else{
        res.status(404).send("u can't access this task >:(")
    }
});

// DELETE
// DELETE
// DELETE
router.delete("/tasks", auth, async (req,res) =>{
    const taskId = req.body.id;
    try{ 
        const task = await Task.findById(taskId);
        if(task.owner == req.user.id){
            const report = await Task.findByIdAndDelete(taskId);
            res.send(report);
        }else{
            res.status(404).send("haha can't do that to task that are not urs!")
        }

    }catch(e){
        console.log(e);
    }
});

// the post handlers are meant for the silly forms frontend
router.post("/tasks/delete/:id", async(req,res) =>{
    const id = req.params.id;
    try{ 
        const report = await Task.findByIdAndDelete(id);
        res.redirect("/delete");
    }catch(e){
        console.log(e);
    }
});
router.delete("/tasks/:id", async(req,res)  =>{
    const id = req.params.id;
    try{ 
        const report = await Task.findByIdAndDelete(id);
        res.redirect("/delete");
    }catch(e){
        console.log(e);
    }
});

module.exports = router;