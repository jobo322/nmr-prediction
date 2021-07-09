const { readFileSync, writeFileSync } = require('fs');

const { default: parseSDF } = require('./parseSDF');

module.exports = function processFile(filename) {
  let sdfText = readFileSync(filename, 'utf8');
  let results = parseSDF(sdfText);

  let hoses = [];
  for (let result of results) {
    for (let assignment of result.assignments) {
      if (assignment.hoses) {
        for (let i = 0; i < assignment.hoses.length; i++) {
          hoses.push({
            id: result.id,
            temperature: result.temperature,
            solvent: result.solvent,
            field: result.field,
            nucleus: result.nucleus,
            delta: assignment.delta,
            sphere: i,
            oclID: assignment.hoses[i],
          });
        }
      }
    }
  }

  writeFileSync(filename.replace('.sdf', '.json'), JSON.stringify(hoses));
};
