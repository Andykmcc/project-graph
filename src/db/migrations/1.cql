CREATE CONSTRAINT ON (effort:Effort) ASSERT effort.id IS UNIQUE;

MERGE (et:EffortType {name: 'standard'})
MERGE (et)-[:HAS_FIELD]->(:Field {name: 'title', type: 'title'})
MERGE (et)-[:HAS_FIELD]->(:Field {name: 'description', type: 'description'})
MERGE (et)-[:HAS_FIELD]->(:Field {name: 'estimate', type: 'number'})
MERGE (et)-[:HAS_FIELD]->(:Field {name: 'status', type: 'string'});
