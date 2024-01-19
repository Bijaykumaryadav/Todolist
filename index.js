const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');

const port = 8000;

// Set up EJS and static file middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));

// Routes
const indexRoute = require('./routes/index');

// Use Routes
app.use('/', indexRoute);

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
