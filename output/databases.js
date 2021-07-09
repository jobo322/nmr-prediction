import { readFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

// we will load all the databases
let files = readdirSync(resolve('.')).filter((file) =>
  file.match(/^\d+[A-Z][a-z]?\.json/),
);
let databases = {};
for (let file of files) {
  databases[file.replace('.json', '')] = JSON.parse(
    readFileSync(join(resolve('.'), file)),
  );
}

export default databases;

