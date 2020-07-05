const routes = require('express').Router();

const { addTask, updateTask, deleteTask, getTasks } = require('../controllers/tasks');

routes.route('/task').post(addTask).put(updateTask).delete(deleteTask);
routes.get('/tasks', getTasks);

module.exports = routes;
