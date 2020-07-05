const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const { getConfiguration, connectMdb } = require('./config/index');
const config = getConfiguration();

const routes = require('./routes');
let dbConnection;

connectMdb().then((db) => {
  dbConnection = db;
  app.use(bodyParser.json());
  app.use(cors());
  app.use('/api/', routes);
  app.locals.db = db;

  app.listen(config.port, () => {
    console.log(`Calender my tasks backend listening on port ${config.port}`);
  });
});

process.on('SIGINT', () => {
  console.log('Closing connection to mongo database');
  dbConnection.close();
  process.exit();
});
