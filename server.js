const log = whatever => console.log(whatever); // => For logging purposes

const express = require('express');
const notesRoutes = require('./routes/NoteRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// v/ TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect("mongodb+srv://db_101292266_lean:k58AYYrFYkm_i9s@cluster0.253ikac.mongodb.net/f2022_comp3104?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use('/api/v1', notesRoutes);

app.route('/')
    .get((req, res) => {
        res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});