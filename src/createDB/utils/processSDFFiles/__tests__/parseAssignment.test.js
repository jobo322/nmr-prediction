import OCL from 'openchemlib/minimal';

import combineFields from '../combineFields';
import parseAssignment from '../parseAssignment';

import entry from './entry.json';

describe('createDB: utils/parseAssignment', () => {
  it('normal parsing', () => {
    let spectra = combineFields(entry);
    let { map: mapping } = OCL.Molecule.fromMolfileWithAtomMap(entry.molfile);
    let spectrum = spectra.find((e) => e.nucleus === '1H');
    let assignments = parseAssignment(spectrum, mapping);
    expect(assignments).toHaveLength(25)
    const expected = [{delta: 0.31, atom: 5}, {delta: 0.71, atom: 6}, {delta: 0.93, atom: 14}];
    for (let i = 0; i < 3; i++) {
        expect(assignments[i].atom).toStrictEqual(expected[i].atom);
        expect(assignments[i].delta).toStrictEqual(expected[i].delta);
    }
  });
});
