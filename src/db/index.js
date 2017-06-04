const neo4j = require('neo4j-driver').v1;
const nconf = require('nconf');
const env = process.env.NODE_ENV || 'development';

nconf.argv() // command line arguments
  .env() // enviroment variables
  .file(`./config/database.${env}.json`); // config file

const host = nconf.get('HOST');
const auth = neo4j.auth.basic(
  nconf.get('USERNAME'),
  nconf.get('PASSWORD')
);
const driver = neo4j.driver(
  host,
  auth
);

// closes all opened sessions when the process exit. It is just
// fail safe to cover edges cases during a crash.
process.on('exit', driver.close);

module.exports = driver;
