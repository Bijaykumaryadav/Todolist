const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('./config/mongoose');
const Task = require('./models/task'); // Import the Mongoose Task model

// Set up EJS and static file middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));

// Routes
const indexRoute = require('./routes/index')(Task); // Pass the Task model to the route

// Use Routes
app.use('/', indexRoute);

const port = 8000;
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
