import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import OCL from 'openchemlib';
import { getDiastereotopicAtomIDsAndH, initOCL, grou } from 'openchemlib-utils';

initOCL(OCL);

// we will load all the databases
let files = readdirSync(join(__dirname, '../output')).filter((file) =>
  file.match(/^\d+[A-Z][a-z]?\.json/),
);
const databases = {};
for (let file of files) {
  databases[file.replace('.json', '')] = JSON.parse(
    readFileSync(join(__dirname, '../output', file)),
  );
}

function predict(molfile, options = {}) {
  const { nucleus = '13C' } = options;
  let molecule = OCL.Molecule.fromMolfile(molfile);
  molecule.addImplicitHydrogens();
  molecule.addMissingChirality();
  let diaIDs = getDiastereotopicAtomIDsAndH(molecule);
  console.log(diaIDs);
}

let molfile = OCL.Molecule.fromSmiles('CCCCC').toMolfile();

console.log(molfile);

predict(molfile);
