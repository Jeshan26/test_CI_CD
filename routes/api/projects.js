//  router objects are named in plual forms
// All apis routers (constroleers) are inside routes/api

const express = require('express');
const router = express.Router();

const Project = require("../../models/project")
/* GET home page. */

router.get('/', async(req, res, next) => {
    let projects = await Project.find();
     res.status(200).json(projects);
});

// POST /projects > add the providedproject in the request body
//  /api/projects
router.post('/',async(req,res,next)=> {
    try {
    // console.log(req.body)
    // res.status(200).json(req.body);

    // validate the request as our schema has some required fields

    if(!req.body.name){
        res.status(400).json({"Validation error":"Name is a required field"});
    }
    else if(!req.body.course){
        res.status(400).json({"Validation error":"Course is a required field"});
    }
   const newProject  = await Project.create({
    name : req.body.name ,
    dueDate : req.body.dueDate,
    course : req.body.course
   });

   //sending response with new project

   res.status(200).json(newProject);
}
catch(err){
// Handle any unexpected errors during creation
console.log(err);
res.status(500).json({ "ErrorMessage": "Server threw an exception" });
}
})

//PUT REQUEST   api/projects/:_id

router.put('/:_id',async (req,res,next)=>{
    try{
        // Validating name and course
        if(!req.body.name){
            res.status(400).json({"Validation error":"Name is a required field"});
        }
        else if(!req.body.course){
            res.status(400).json({"Validation error":"Course is a required field"});
        }
        const project_id = req.params._id;
        const updatedProject = await Project.findOneAndUpdate(
            {_id : project_id}, // this will find the document with id fro param
            {$set : req.body}, // this will update the existing id with new data
            {new : true} // return the updated document
        );

        if(!updatedProject){
            return res.status(400).json({message : "Project not found"})
        }
        res.status(200).json(updatedProject);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Server Error"})
    }
});

// delete  api/project/:_id
router.delete('/:_id',async (req,res,next)=>{
    try{
        // Validating name and course
       
        project_id = req.params._id;
        const deleteProject = await Project.findOneAndDelete(
            {_id : project_id}, // this will find the document with id fro param
        );

        if(!deleteProject){
            return res.status(400).json({message : "Project not found"})
        }
        res.status(200).json(deleteProject);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Server Error"})
    }
});

module.exports = router;