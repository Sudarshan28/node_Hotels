const express = require("express");
const mongoose = require("mongoose");
const Person = require("../models/person");
const router = express.Router();

// POST - add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET - all persons
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET - by work type
router.get("/work/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType === "chef" || workType === "manager" || workType === "waiter") {
      const response = await Person.find({ work: workType }); // ✅ Fixed: was __Person__
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT - update a person
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, { // ✅ Fixed: was __Person__
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE - delete a person
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(personId)) { // ✅ Fixed: was __mongoose__.__Types__.__ObjectId__
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const response = await Person.findByIdAndDelete(personId); // ✅ Fixed: was __Person__
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "person deleted successfully" });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;