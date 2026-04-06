const express=require("express");
const Person = require("../models/person");
const router = express.Router();


// POST route to add a person
router.post('/', async (req, res) =>{
    try{
        const data = req.body; // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();                 //async is a function and await means wait and its a part of async function
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.get("/",async(req,res)=>{
  try{
    const data=await Person.find();
    console.log("data fetched");
    res.status(200).json(data);

  }catch(error){
    console.log(error);
    res.status(500).json({error:'Internal Server Error'});
  }
});

router.get("/work/:workType", async(req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put("/:id",async (req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new :true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({error:"person not found"});
        }
        console.log("data updated");
        res.status(200).json(response);

    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete("/:id", async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const personId = req.params.id;

    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data deleted");
    res.status(200).json({ message: "person deleted successfully" });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports=router;
