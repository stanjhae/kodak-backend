const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const cors = require('cors');
const compression = require('compression');

mongoose.Promise = global.Promise = bluebird;

const app = express();
const server = require('http').Server(app);

const config = require('./config');
const routes = require('./routes/');

const router = express.Router();

routes(router);

mongoose.connect('mongodb+srv://stanjhae:kodakblack@cluster0-nuhqm.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use(compression({ level: 6 })); // Default compression level is 6

app.use(logger('dev'));
app.use(bodyParser.json({ limit: config.MAX_PAYLOAD }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router);

startServer();

function startServer() {
  const { PORT } = config;
  server.listen(PORT);
  server.on('close', async (err) => {
    if (err) throw err;

    console.log('\nClosing db connections...\n');
    try {
      await mongoose.disconnect();
    } catch (e) {
      console.error(e.message);
    }
    console.log('Server Out!! *drops mic*');
  });

  process.on('SIGINT', () => server.close());

  console.log(`Running on port: ${PORT}`);
}
