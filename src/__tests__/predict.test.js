import { predict } from '../predict';

const molfile = `
Actelion Java MolfileCreator 2.0

  0  0  0  0  0  0              0 V3000
M  V30 BEGIN CTAB
M  V30 COUNTS 8 8 0 0 0
M  V30 BEGIN ATOM
M  V30 1 C 9.1875 -11 0 0
M  V30 2 C 9.1875 -12.5 0 0
M  V30 3 C 10.4865 -13.25 0 0
M  V30 4 C 11.7855 -12.5 0 0
M  V30 5 C 11.7855 -11 0 0
M  V30 6 C 10.4865 -10.25 0 0
M  V30 7 C 13.0846 -10.25 0 0
M  V30 8 C 14.3836 -11 0 0
M  V30 END ATOM
M  V30 BEGIN BOND
M  V30 1 2 1 2
M  V30 2 1 2 3
M  V30 3 2 3 4
M  V30 4 1 4 5
M  V30 5 2 5 6
M  V30 6 1 6 1
M  V30 7 1 5 7
M  V30 8 1 7 8
M  V30 END BOND
M  V30 END CTAB
M  END
`;
describe('prediction', () => {
  it('compare with nmrshiftdb web service', () => {
    let predictions = predict(molfile, { nucleus: '1H', use: 'mean' });
    expect(predictions[0].delta !== undefined).toBe(false);
  });
});
