const MongoClient = require('mongoDB').MongoClient;

function createConnection() {
  const uri = "mongodb+srv://deepak:taskmanager@calender-my-tasks.kucu5.mongodb.net/CalenderMyTasks?retryWrites=true&w=majority";
  
  console.log('Starting connection to Cloud Atlas Mongo');
  return new Promise((res) => {
    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      console.log('Connected to Mongo Database');
      const calenderMyTasks = client.db('CalenderMyTasks');
      res(calenderMyTasks);
    }).catch((err) => {
      console.error(err);
    })
  });
}

module.exports = {
  connectMdb: createConnection,
};
