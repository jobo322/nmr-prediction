import Debug from 'debug';

const debug = new Debug('parseAssignment');

export default function parseAssignment(spectrum, mapping) {
  let lines = spectrum.assignmentString.split('|').filter((v) => v);
  let results = [];
  for (let line of lines) {
    const fields = line.split(';');
    const atomNumber = Number(fields[2]);
    if (atomNumber > mapping.length) {
      console.log(atomNumber, mapping.length);
      console.error(`atomNumber too big: ${JSON.stringify(spectrum)}`);
    }
    if (atomNumber !== mapping[atomNumber]) {
      debug(
        `renumbering ${spectrum.id} from:${atomNumber} to:${mapping[atomNumber]}`,
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
