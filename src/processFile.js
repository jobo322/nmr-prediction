import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import parseSDF from './parseSDF';

export default function processFile(filename) {
  let sdfText = readFileSync(filename, 'utf8');
  let results = parseSDF(sdfText);

  let hoses = [];
  for (let result of results) {
    for (let assignment of result.assignments) {
      if (assignment.hoses && assignment.hoses.hoses) {
        for (let currentHose of assignment.hoses.hoses) {
          hoses.push({
            id: result.id,
            temperature: result.temperature,
            solvent: result.solvent,
            field: result.field,
            nucleus: result.nucleus,
            delta: assignment.delta,
            sphere: currentHose.sphere,
            oclID: currentHose.oclID,
          });
        }
      }
    }
  }

  writeFileSync(filename.replace('.sdf', '.json'), JSON.stringify(hoses));
}

processFile(join(__dirname, '../output', process.argv[2]));
