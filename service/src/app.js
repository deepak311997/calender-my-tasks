const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getConfiguration, connectMdb } = require('./config/index');
const config = getConfiguration();
const port = process.env.PORT || config.port;

const app = express();
const routes = require('./routes');
let dbConnection;

connectMdb().then((db) => {
  dbConnection = db;
  app.use(bodyParser.json());
  app.use(cors());
  app.use('/api/', routes);
  app.use(express.static(__dirname))

  app.locals.db = db;

  app.listen(port, () => {
    console.log(`Calender my tasks backend listening on port ${port}`);
  });
});

process.on('SIGINT', () => {
  console.log('Closing connection to mongo database');
  dbConnection.close();
  process.exit();
});
