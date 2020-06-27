import { fork } from 'child_process';
import { readdirSync } from 'fs';
import { join } from 'path';

function createJSON() {
  let files = readdirSync(join(__dirname, '../output')).filter((file) =>
    file.match(/sdf$/),
  );
  files = files.slice(4);

  for (let file of files) {
    fork('./src/processFile', [file]);
  }
}

createJSON();
