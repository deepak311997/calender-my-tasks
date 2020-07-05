const { save, update, removeTask, getAll } = require('../services/tasks-service');

const addTask = (req, res) => {
  const { title, description, date } = req.body;

  if (!title || !date) {
    res.status(400).send({ data: {}, message: 'Bad request' });
    return;
  }

  save(req.app.locals.db, { title, description, date }).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(err);
  });
};

const updateTask = (req, res) => {
  const { _id, title, description, date } = req.body;

  if (!title || !date) {
    res.status(400).send({ data: {}, message: 'Bad request' });
    return;
  }

  update(req.app.locals.db, _id, { title, description, date }).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(err);
  })
};

const deleteTask = (req, res) => {
  const taskId = req.query.id;

  if (!taskId) {
    res.status(400).send({ data: {}, message: 'Bad request' });
    return;
  }

  removeTask(req.app.locals.db, taskId).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(err);
  })
};

const getTasks = (req, res) => {
  getAll(req.app.locals.db).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send(err);
  })
};

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    getTasks
};
