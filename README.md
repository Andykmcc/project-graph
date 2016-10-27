# Project Graph

[![Build Status](https://travis-ci.org/Andykmcc/project-graph.svg?branch=master)](https://travis-ci.org/Andykmcc/project-graph) [![Coverage Status](https://coveralls.io/repos/github/Andykmcc/project-graph/badge.svg?branch=master)](https://coveralls.io/github/Andykmcc/project-graph?branch=master)


A project management tool

This is built on NodeJS and Express. It is a stateless JSON API.

## Installation

This assumes you have NodeJS and Neo4j installed. I suggest installing Node via [NVM](https://github.com/creationix/nvm).

1. clone the repo
2. `cd project-graph`
3. `nvm use`
4. `npm install`

### Database

* Install [Neo4j](https://neo4j.com/download/community-edition/)
* Start Neo4j, set a new password for the `neo4j` user.
* Make a copy of the file `/src/config/database.example.json` and name it `database.development.json`
* Change the value in the password field to match what you set in your local Neo4j.


## Usage

1. `npm run start:dev`
2. In another terminal run `curl 'http://localhost:8080/api/v1/efforts'` to test the API
