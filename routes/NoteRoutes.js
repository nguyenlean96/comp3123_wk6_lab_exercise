const log = whatever => console.log(whatever);

const express = require("express");
const mongoose = require("mongoose");

const noteModel = require('../models/NotesModel');
const routes = express.Router();


//TODO - Create a new Note
/*
{
    title: "submit this exercise",
    noteDescription: "Submit this exercise before the due time.",
    priority: "high",
    dateAdded: "",
    dateUpdated: ""
}
*/
//http://mongoosejs.com/docs/api.html#document_Document-save
routes.post('/note/new', async (req, res) => {
    try {
        // Validate request
        log(req.body);
        
        if(!req.body) {
            res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        let newNote = new noteModel(req.body);

        if (!(newNote.dateAdded)) {
            newNote.dateAdded = new Date();
            newNote.dateUpdated = null;
        } else {
            if (!(newNote.dateUpdated)) {
                newNote.dateUpdated = new Date();
            }
        }
        if (!(newNote.priority)) {
            throw new Error("Note must have a specified priority such as HIGH, MEDIUM or LOW");
        }
        
        let note = await newNote.save();
        res.status(201).send({
            new_note: note,
            message: `New note [${note.title}] added successfully!`
        });
        //TODO - Write your code here to save the note
    } catch (error) {
        res.status(400).send({
            message: "Note content can not be empty",
            error: error.message
        });
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
routes.get('/notes', async (req, res) => {
    //TODO - Write your code here to returns all note
    try {
		const notes = await noteModel.find();
		res.status(200).send(notes);
	} catch (error) {
		res.status(400).send({
            error: error.message
        });
	}
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
routes.get('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to return onlt one note using noteid
    try {
		let note_id = req.params.noteId;
		const note = await noteModel.findById(note_id);
		if (!note) {
			throw new Error(`Note with id [${note_id}] not found`);
		}
		res.status(200).send(note);
	} catch (error) {
		res.status(400).send({message: error.message});
	}
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
routes.put('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to update the note using noteid
    try {
        let updateContent = req.body;
        if(!updateContent.dateUpdated) {
            updateContent.dateUpdated = new Date();
        }
		const note = await noteModel.findByIdAndUpdate(req.params.noteId, updateContent);
        let confirmUpdate = await noteModel.findById(updateContent._id);
        log(confirmUpdate)
		res.status(201).send(note);
	} catch (error) {
		res.status(400).send(error);
	}
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
routes.delete('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to delete the note using noteid
    try {
		const deleteNote = await noteModel.findByIdAndDelete(req.params.noteId, req.body);
		if (!deleteNote) {
			throw new Error('Note not found');
		}
		res.status(201).send({
            message: `Note [${deleteNote._id}] deleted`,
            content: deleteNote
        });
	} catch (error) {
		log(error.message);
		res.status(400).send({message: "Note Not Found"});
	}
});

module.exports = routes;