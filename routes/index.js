// routes/index.js
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

module.exports = function (Task) {
    // Pass the Task model to the controller
    indexController.setTaskModel(Task);

    // Define routes
    router.get('/', indexController.home);

    // Fetch tasks route
    router.get('/tasks', indexController.getTasks);

    // Save task route
    router.post('/tasks', indexController.addTask);

    return router;
};
