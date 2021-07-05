import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import { signalsToRanges } from 'nmr-processing';
import { addDiastereotopicMissingChirality } from 'openchemlib-utils';
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

/**
 *
 * @param {*} molfile
 * @param {*} options
 * @returns
 */

export function predict(molfile, options = {}) {
  const {
    nucleus = '13C',
    deltaByMean = false,
    ignoreLabile = true,
    keepHose = false,
    levels = [4, 3, 2, 1, 0],
    includeDistanceMatrix = false,
  } = options;

  let molecule = OCL.Molecule.fromMolfile(molfile);

  molecule.addImplicitHydrogens();
  molecule.addMissingChirality();
  addDiastereotopicMissingChirality(molecule);

  const inputJSON = createInputJSON(molecule, {
    levels,
    includeDistanceMatrix,
  });

  let predictions = queryByHose(inputJSON, databases[nucleus], {
    ignoreLabile,
    deltaByMean,
    levels,
    keepHose,
    nucleus,
  });

  const signals = formatSignals(predictions);
  const joinedSignals = joinSignalByDiaID(signals);
  return {
    molfile,
    diaIDs: inputJSON.diaIDs.map((e) => e.diaId),
    joinedSignals,
    signals,
    ranges: signalsToRanges(joinedSignals),
  };
}

function formatSignals(predictions) {
  let signals = [];
  for (const prediction of predictions) {
    const { nb, std, min, max, atomIDs, nbAtoms, delta, level, diaIDs, hose } =
      prediction;
    let stat = {
      nb,
      level,
      std,
      min,
      max,
      hose,
    };
    signals.push({
      delta,
      assignment: atomIDs,
      diaID: diaIDs,
      nbAtoms,
      j: [],
      stat,
    });
  }
  return signals;
}

function joinSignalByDiaID(signals) {
  let joinedSignals = {};
  for (let signal of signals) {
    let diaID = signal.diaID[0];
    if (!joinedSignals[diaID]) {
      joinedSignals[diaID] = signal;
    } else {
      joinedSignals[diaID].nbAtoms += signal.nbAtoms;
      joinedSignals[diaID].assignment.push(...signal.assignment);
    }
  }
  return Object.values(joinedSignals);
}
