import {
  addDiastereotopicMissingChirality,
  getHoseCodesFromDiastereotopicID,
  getExtendedDiastereotopicAtomIDs,
} from 'openchemlib-utils';
import OCL from 'openchemlib/minimal';
import SDFParser from 'sdf-parser';

import combineFields from './combineFields';
import parseAssignment from './parseAssignment';

export default function parseSDF(sdfText) {
  let sdf = SDFParser(sdfText);

  let results = [];
  for (let i = 0; i < sdf.molecules.length; i++) {
    try {
      const entry = sdf.molecules[i];
      if (i % 100 === 0) {
        console.log(`${i} / ${sdf.molecules.length}`);
      }
      let spectra = combineFields(entry);

      let molfile = entry.molfile;
      let separator = molfile.match('\r\n') ? '\r\n' : '\n';
      let molfileLines = molfile.split(separator);

      for (let j = 0; j < molfileLines.length; j++) {
        if (molfileLines[j].match(/V[2|3]000/)) {
          for (let k = j + 1; k < molfileLines.length; k++) {
            if (molfileLines[k].length < 69) break;
            molfileLines[k] =
              `${molfileLines[k].substr(0, 48)
              }  0${
              molfileLines[k].substr(51)}`;
          }
          break;
        }
      }
      entry.molfile = molfileLines.join(separator);

      let { molecule, map: mapping } = OCL.Molecule.fromMolfileWithAtomMap(
        entry.molfile,
      );
      molecule = OCL.Molecule.fromMolfile(entry.molfile);
      let current = [];
      for (let spectrum of spectra) {
        spectrum.assignments = parseAssignment(spectrum, mapping);
        current.push(spectrum);
      }
      molecule.addImplicitHydrogens();
      addDiastereotopicMissingChirality(molecule);
      const diaIDs = getExtendedDiastereotopicAtomIDs(molecule);
      for (let result of current) {
        const nucleus = result.nucleus;
        for (let assignment of result.assignments) {
          let atomIndex = assignment.atom;
          let atomLabel = molecule.getAtomLabel(atomIndex);
          let diaID = diaIDs[atomIndex];
          if (nucleus !== atomLabel && nucleus === '1H') {
            if (diaID.nbHydrogens < 1) {
              console.log('heavy atom has not hydrogens');
              continue;
            } else {
              diaID = diaID.hydrogenOCLIDs;
            }
          } else {
            diaID = [ diaID.oclID ];
          }
          for (const dia of diaID) {
            let hoses = getHoseCodesFromDiastereotopicID(
              OCL.Molecule.fromIDCode(dia),
              { maxSphereSize: 6 },
            );
            assignment.hoses = hoses;
            results.push(JSON.parse(JSON.stringify(result)));
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return results;
}
