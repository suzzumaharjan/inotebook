const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
//Roue 1: Get all the notes using: GET "/api/notes/fetchall notes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);

})
//Route 2:add notes using :POST"/api/notes/addnotes"
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid name').isLength({ min: 4 }),
    body('description', 'description must be of 5 character').isLength({ min: 5 })
], async (req, res) => {
    try {
        //de-structuring concept
        const { title, description, tag } = req.body;
        //if there are errors return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");

    }

})

//Route 3:update an existing  notes using :PUT"/api/notes/addnotes" Login require
router.put('/updatenote/:id', fetchuser, [

], async (req, res) => {
    const { title, description, tag } = req.body;
    try {
    //create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }
    //find the note to be updates and update it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(400).send("Not Found") };
    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note);
} catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error");
}
})



//Route 3:DELETE an existing  notes using :POST"/api/notes/DELETENOTE" Login require
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   try {
    
   
    //find the note to be delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note)
     { return res.status(400).send("Not Found");

      }

    //Allow deleteion only if user own this Note
    if (note.user.toString() !== req.user.id)
         { return res.status(401).send("Not Allowed") ;

         }
    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"This note has been deleted",note:note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error");
}
})

module.exports = router;