import combineFields from '../combineFields';

const entry = {
  molfile:
    '(1S,10S)-9alpha-hydroxy-allo-aromadendrane\n' +
    '  CDKD\n' +
    'nmrshiftdb2 2459\n' +
    ' 21 23  0  0  0  0  0  0  0  0999 V2000\n' +
    '    9.1627   -4.1392    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    9.0887   -4.9608    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    9.8474   -5.2851    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '   10.3902   -4.6639    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    9.9670   -3.9556    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '   10.3249   -3.2122    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    9.9670   -2.4690    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    9.1627   -2.2853    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    8.5176   -2.7998    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    8.5176   -3.6248    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '   10.7897   -2.5306    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '   11.5094   -2.6204    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '   11.0998   -1.7750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    7.7743   -3.9827    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '   11.0154   -4.6200    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    7.9410   -1.9478    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    9.3450   -3.3404    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    9.4561   -3.3151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '   11.0345   -3.6219    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '   10.0891   -1.6588    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '    8.2364   -2.0302    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0\n' +
    '  1  2  1  0  0  0  0 \n' +
    '  1  5  1  0  0  0  0 \n' +
    '  2  3  1  0  0  0  0 \n' +
    '  3  4  1  0  0  0  0 \n' +
    '  4  5  1  0  0  0  0 \n' +
    '  4 15  1  6  0  0  0 \n' +
    '  5  6  1  0  0  0  0 \n' +
    '  6  7  1  0  0  0  0 \n' +
    '  7  8  1  0  0  0  0 \n' +
    '  8  9  1  0  0  0  0 \n' +
    '  9 10  1  0  0  0  0 \n' +
    ' 10  1  1  0  0  0  0 \n' +
    ' 10 14  1  6  0  0  0 \n' +
    ' 11  6  1  0  0  0  0 \n' +
    ' 11  7  1  0  0  0  0 \n' +
    ' 11 12  1  6  0  0  0 \n' +
    ' 11 13  1  1  0  0  0 \n' +
    '  1 17  1  1  0  0  0 \n' +
    '  5 18  1  1  0  0  0 \n' +
    '  6 19  1  6  0  0  0 \n' +
    '  7 20  1  6  0  0  0 \n' +
    '  9 21  1  1  0  0  0 \n' +
    '  9 16  1  6  0  0  0 \n' +
    'M  END\n',
  'Temperature [K]': '0:298 1:298 ',
  'nmrshiftdb2 ID': 2459,
  'Spectrum 1H 1':
    '0.31;0.0t;5|0.71;0.0ddd;6|0.93;0.0d;14|0.93;0.0d;14|0.93;0.0d;14|1.0;0.0s;11|1.0;0.0s;11|1.0;0.0s;11|1.08;0.0s;12|1.08;0.0s;12|1.08;0.0s;12|1.1;0.0d;13|1.1;0.0d;13|1.1;0.0d;13|1.13;0.0m;2|1.27;0.0m;7|1.6;0.0m;4|1.69;0.0m;2|1.72;0.0m;1|1.74;0.0m;1|1.76;0.0m;9|1.9;0.0m;3|2.16;0.0m;0|2.26;0.0m;7|3.8;0.0dd;8|',
  'Field Strength [MHz]': '0:50 1:200 ',
  'Spectrum 13C 0':
    '15.86;0.0Q;11|15.86;0.0Q;14|16.3;0.0Q;13|17.9;0.0S;10|20.6;0.0D;6|23.2;0.0D;5|25.6;0.0T;1|28.7;0.0Q;12|29.4;0.0T;2|30.8;0.0T;7|37.9;0.0D;3|41.4;0.0D;9|43.0;0.0D;4|50.0;0.0D;0|75.7;0.0D;8|',
  Solvent: '0:Chloroform-D1 (CDCl3) 1:Chloroform-D1 (CDCl3) ',
  'Assignment Method': '1:Unknown \n\n',
};

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
