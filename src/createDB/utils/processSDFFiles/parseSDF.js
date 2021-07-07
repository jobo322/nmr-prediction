import {
  addDiastereotopicMissingChirality,
  getHoseCodesAndDiastereotopicIDs,
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
      console.log(`${i} / ${sdf.molecules.length}`);
      let spectra = combineFields(entry);

      let { molecule, map: mapping } = OCL.Molecule.fromMolfileWithAtomMap(
        entry.molfile,
      );

      molecule = OCL.Molecule.fromMolfile(entry.molfile);
      let current = [];
      for (let spectrum of spectra) {
        spectrum.assignments = parseAssignment(spectrum, mapping);
        results.push(spectrum);
        current.push(spectrum);
      }

      molecule.addImplicitHydrogens();
      addDiastereotopicMissingChirality(molecule);
      const diaIDs2 = getExtendedDiastereotopicAtomIDs(molecule);
      const diaIDs = getHoseCodesAndDiastereotopicIDs(molecule);
      console.log(diaIDs.length, diaIDs2.length);
      for (let result of current) {
        const nucleus = result.nucleus;
        for (let assignment of result.assignments) {
          let atomIndex = assignment.atom;
          let atomLabel = molecule.getAtomLabel(atomIndex);
          console.log(nucleus, atomLabel, atomIndex);
          if (nucleus !== atomLabel && nucleus === '1H') {
            try {
              let diaID = diaIDs2[atomIndex];
              // console.log(escape(diaID.oclID));
              // console.log(
              //   getHoseCodesFromDiastereotopicID(
              //     OCL.Molecule.fromIDCode(diaID.oclID),
              //     { maxSphereSize: 2 },
              //   )//.map(e => String(unescape(e))),
              // );
              // if (diaID.nbHydrogens < 1) throw new Error('heavy atom has not hydrogens');

              // console.log(
              //   getHoseCodesFromDiastereotopicID(
              //     OCL.Molecule.fromIDCode(diaID.hydrogenOCLIDs[0]),
              //     { maxSphereSize: 6 },
              //   ),
              // );
            } catch (e) {
              console.log(e);
            }
          }
          assignment.hoses = diaIDs[assignment.atom];
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return results;
}
