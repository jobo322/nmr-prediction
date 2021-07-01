import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import OCL from 'openchemlib/minimal';

import { createInputJSON } from './utils/createInputJSON/createInputJSON';
import { queryByHose } from './utils/queryByHOSE';

// we will load all the databases
let files = readdirSync(join(__dirname, '../databases')).filter((file) =>
  file.match(/^\d+[A-Z][a-z]?\.json/),
);
const databases = {};
for (let file of files) {
  databases[file.replace('.json', '')] = JSON.parse(
    readFileSync(join(__dirname, '../databases', file)),
  );
}

function predict(molfile, options = {}) {
  const {
    nucleus = '13C',
    ignoreLabile = true,
    use = 'median',
    levels = [4, 3, 2, 1, 0],
    includeDistanceMatrix = false,
  } = options;

  let molecule = OCL.Molecule.fromMolfile(molfile);
  molecule.addImplicitHydrogens();
  molecule.addMissingChirality();

  const inputJSON = createInputJSON(molecule, {
    levels,
    includeDistanceMatrix,
  });

  let predictions = queryByHose(inputJSON, databases[nucleus], {
    ignoreLabile,
    use,
    levels,
    nucleus,
  });
  console.log(predictions);
}

let molfile = OCL.Molecule.fromSmiles('CCCCC').toMolfile();

predict(molfile);
