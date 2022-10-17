const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
const noteSchema = new mongoose.Schema({
    //      - noteTitle
    title: {
        type: String,
        require: true,
        lowercase: true
    },
    //      - noteDescription
    noteDescription: String,
    //      - priority (Value can be HIGH, LOW or MEDUIM)
    priority: String,
    //      - dateAdded
    dateAdded: Date,
    //      - dateUpdated
    dateUpdated: Date
});

module.exports = mongoose.model("Notes", noteSchema);