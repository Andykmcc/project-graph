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
* Make a copy of the file `/config/database.example.json` and name it `database.development.json`
* Change the value in the password field to match what you set in your local Neo4j.

## Usage

* Run `npm start`
* In another terminal run `curl 'http://localhost:8080/api/v1/efforts'` to test the API
* The terminal will return a url beginning with `chrome-devtools://devtools/bundled/inspector.html`, copy the complete url into chrome to debug the node process with the Chrome DevTools. I recommend install the [node inspector manager](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj?hl=en-US) to have a much more pleasant debugging experience.
* I recommend install [Insomnia](https://insomnia.rest/) or [Postman](https://www.getpostman.com/) unless you are a CuRL expert.
