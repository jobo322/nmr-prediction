import {
  getGroupedDiastereotopicAtomIDs,
  getHoseCodesFromDiastereotopicID,
  getShortestPaths,
} from 'openchemlib-utils';
import OCL from 'openchemlib/minimal';

export function createInputJSON(molecule, options) {
  const { levels, includeDistanceMatrix = false } = options;

  let nH =
    molecule.getMolecularFormula().formula.replace(/.*H([0-9]+).*/, '$1') * 1;

  let diaIDs = getGroupedDiastereotopicAtomIDs(molecule);
  diaIDs.sort(function (a, b) {
    if (a.atomLabel === b.atomLabel) {
      return b.counter - a.counter;
    }
    return a.atomLabel < b.atomLabel ? 1 : -1;
  });

  const connections = getShortestPaths(molecule, {
    toLabel: 'H',
    maxLength: 1,
  });

  const atoms = {};
  for (const diaId of diaIDs) {
    delete diaId._highlight;
    diaId.hose = getHoseCodesFromDiastereotopicID(
      OCL.Molecule.fromIDCode(diaId.oclID),
      {
        maxSphereSize: levels[0],
      },
    );

    for (const atomID of diaId.atoms) {
      atoms[atomID] = diaId.oclID;
    }

    diaId.isLabile = isItLabile(diaId, molecule, connections);
  }

  let toReturn = {
    id: molecule.getIDCode(),
    atom: atoms,
    diaIDs,
    nH: nH,
    hasLabile: diaIDs.some((diaID) => diaID.isLabile),
  };

  if (includeDistanceMatrix) {
    toReturn.distanceMatrix = molecule.getConnectivityMatrix({
      pathLength: true,
    });
  }

  return toReturn;
}

function isItLabile(diaId, molecule, connections) {
  if (diaId.atomLabel !== 'H') return false;

  let connectedTo = connections[diaId.atoms[0]];
  let path = connectedTo.find((p) => p && p.length > 1);
  let atomLabel = molecule.getAtomLabel(path[1]);

  switch (atomLabel) {
    case 'N':
    case 'O':
    case 'Cl':
      return true;
    default:
      return false;
  }
}
