const neo4j = require('neo4j-driver').v1;
const nconf = require('nconf');

nconf.argv() // command line arguments
  .env() // enviroment variables
  .file(`./config/database.${process.env.NODE_ENV}.json`); // config file

module.exports = neo4j.driver(nconf.get('HOST'),
  neo4j.auth.basic(nconf.get('USERNAME'), nconf.get('PASSWORD'))
);
