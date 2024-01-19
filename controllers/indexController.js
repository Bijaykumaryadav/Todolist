// controllers/indexController.js
exports.home = function (req, res) {
    res.render('home', { pageTitle: 'Todolist App' });
};
