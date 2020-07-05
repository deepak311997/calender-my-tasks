const ObjectID = require('mongodb').ObjectID;

const save = (db, newTask) => new Promise((resolve, reject) => {
    db.collection('tasks').insertOne(newTask, (err, response) => {
        if (err) {
            reject({ data: {}, message: 'Failed add the task' });
        } else {
            resolve({ data: response.ops[0], message: 'Task added successfully' });
        }
    });
});

const update = (db, taskId, newTask) => new Promise((resolve, reject) => {
    db.collection('tasks').findOneAndUpdate({ _id: ObjectID(taskId) }, { $set: newTask }, { returnNewDocument: true },
        (err, response) => {
            if (err) {
                reject({ data: {}, message: 'Failed to update the task' });
            } else {
                resolve({ data: response.value, message: 'Task updated successfully' });
            }
    });
});

const removeTask = (db, taskId) => new Promise((resolve, reject) => {
    db.collection('tasks').findOneAndDelete({ _id: ObjectID(taskId) }, (err, response) => {
        if (err) {
            reject({ data: {}, message: 'Failed delete the task' });
        } else {
            if (response.value) {
                resolve({ data: response.value, message: 'Task deleted successfully' });
            } else {
                reject({ data: {}, message: 'Task does not exist' });
            }
        }
    });
});

const getAll = (db) => new Promise((resolve, reject) => {
    const result = [];

    db.collection('tasks').find({}).forEach(function(doc) {
        result.push(doc);
      }, function(err) {
        if (err) {
            reject({ data: {}, message: 'Failed to fetch tasks' });
        } else {
            resolve({ data: result, message: 'Task fetched successfully' });
        }
      });
});

module.exports = {
    save,
    update,
    removeTask,
    getAll,
}