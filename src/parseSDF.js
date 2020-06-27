import SDFParser from 'sdf-parser';
import combineFields from './combineFields';
import OCL from 'openchemlib';
import {
  addDiastereotopicMissingChirality,
  getHoseCodesAndDiastereotopicIDs,
  initOCL,
} from 'openchemlib-utils';
import parseAssignment from './parseAssignment';

initOCL(OCL);

export default function parseSDF(sdfText) {
  let sdf = SDFParser(sdfText);
  let results = [];
  for (const entry of sdf.molecules) {
    let spectra = combineFields(entry);

    const { molecule, map: mapping } = OCL.Molecule.fromMolfileWithAtomMap(
      entry.molfile,
    );
    for (let spectrum of spectra) {
      spectrum.assignment = parseAssignment(spectrum, mapping);
      results.push(spectrum);
    }
    /*
    molecule.addImplicitHydrogens();
    addDiastereotopicMissingChirality(molecule);
    let diaIDs = getHoseCodesAndDiastereotopicIDs(molecule);
    */
  }

  return results;
}
