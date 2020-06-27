import Debug from 'debug';
const debug = new Debug('parseAssignment');

export default function parseAssignment(spectrum, mapping) {
  let lines = spectrum.assignmentString.split('|').filter((v) => v);
  let results = [];
  for (let line of lines) {
    const fields = line.split(';');
    const atomNumber = Number(fields[2]);
    if (atomNumber > mapping.length) {
      throw Error('atomNumber too big');
    }
    if (atomNumber !== mapping[atomNumber]) {
      debug(
        'renumbering ' +
          spectrum.id +
          ' from:' +
          atomNumber +
          ' to:' +
          mapping[atomNumber],
      );
    }
    results.push({
      delta: Number(fields[0]),
      multiplicity: fields[1],
      atom: mapping[atomNumber],
    });
  }
  return results;
}
