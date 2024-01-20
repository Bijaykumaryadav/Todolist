// controllers/indexController.js
let Task;

exports.setTaskModel = function (model) {
    Task = model;
};

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

exports.getTasks = async function (req, res) {
    try {
        // Fetch tasks from MongoDB
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addTask = async function (req, res) {
    const { title, category, date, completed } = req.body;

    try {
        // Create a new task using the Task model
        const newTask = new Task({
            title,
            category,
            date,
            completed,
        });

        // Save the task to the database
        await newTask.save();

        res.json({ message: 'Task added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
