const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.use(express.urlencoded({extended: true}));

// GET
// GET
// GET
router.get("/tasks", async (req,res) =>{
    try{
        const tasks = await Task.find();
        res.send(tasks);
    }catch (e){
        console.log(e);
    }
});

router.get("/tasks:id", async (req,res) =>{
    let id = req.params.id
    try{
        const task = await Task.findById(id);
        res.send(task);
    }catch(e){
        console.log(e);
    }
});

// POST
// POST
// POST
router.post("/tasks", async (req,res) =>{
    const task = new Task(req.body);
    try{
        await task.save();
        res.redirect("/tasks");
    }catch (e){
        console.log(e);
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

router.put("/tasks/:id", async (req,res) =>{
    const id = req.params.id;
    const task = req.body;
    try{
        await Task.findByIdAndUpdate(id, task);
        res.redirect("/update");        
    }catch(e){
        console.log(e);
    }
});

// DELETE
// DELETE
// DELETE
router.delete("/tasks", async (req,res) =>{
    const taskId = req.body.id;
    try{ 
        const report = await Task.findByIdAndDelete(taskId);
        res.send(report);
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