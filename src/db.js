const neo4j = require('neo4j-driver').v1;
const dbConfig = require(`../config/database.${process.env.NODE_ENV}.json`);

process.env['HOST'] = process.env['HOST'] || dbConfig.HOST;
process.env['USERNAME'] = process.env['USERNAME'] || dbConfig.USERNAME;
process.env['PASSWORD'] = process.env['PASSWORD'] || dbConfig.PASSWORD;

module.exports = neo4j.driver(process.env['HOST'], neo4j.auth.basic(process.env['USERNAME'], process.env['PASSWORD']));
