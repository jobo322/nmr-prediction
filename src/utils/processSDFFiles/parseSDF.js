import {
  addDiastereotopicMissingChirality,
  getHoseCodesAndDiastereotopicIDs,
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
      console.log(`${i} / ${sdf.molecules.length}`);
      let spectra = combineFields(entry);

      const { molecule, map: mapping } = OCL.Molecule.fromMolfileWithAtomMap(
        entry.molfile,
      );
      let current = [];
      for (let spectrum of spectra) {
        spectrum.assignments = parseAssignment(spectrum, mapping);
        results.push(spectrum);
        current.push(spectrum);
      }

      molecule.addImplicitHydrogens();
      addDiastereotopicMissingChirality(molecule);
      const diaIDs = getHoseCodesAndDiastereotopicIDs(molecule);
      for (let result of current) {
        for (let assignment of result.assignments) {
          assignment.hoses = diaIDs[assignment.atom];
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return results;
}
