import combineFields from '../combineFields';

import entry from './entry.json';

describe('createDB: utils/combineFields', () => {
  it('good entry', () => {
    const expectedResult = {
      '1H': {
        assignmentString: '0.31;0.0t;5|',
        field: 200,
      },
      '13C': {
        assignmentString: '15.86;0.0Q;1',
        field: 50,
      },
    };
    const result = combineFields(entry);
    expect(result).toHaveLength(2);
    for (let currentResult of result) {
      expect(currentResult.temperature).toStrictEqual(298);
      expect(currentResult.assignmentString.substr(0, 12)).toStrictEqual(
        expectedResult[currentResult.nucleus].assignmentString,
      );
      expect(currentResult.solvent).toStrictEqual('Chloroform-D1 (CDCl3)');
      expect(currentResult.field).toStrictEqual(
        expectedResult[currentResult.nucleus].field,
      );
    }
  });
});
