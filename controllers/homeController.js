const Task = require('../models/task');

exports.home = async function (req, res) {
    try {
        // Fetch tasks from MongoDB
        const tasks = await Task.find();

        // Render the 'home' view and pass the tasks to it
        res.render('home', { pageTitle: 'Todolist App', tasks });
    } catch (error) {
        // Handle errors if any occur during the process
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
