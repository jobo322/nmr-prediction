import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import { predict } from '../predict';

const molfileInDB = `(1S,10S)-9alpha-hydroxy-allo-aromadendrane
  CDKD
nmrshiftdb2 2459
 21 23  0  0  0  0  0  0  0  0999 V2000
    9.1627   -4.1392    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.0887   -4.9608    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.8474   -5.2851    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   10.3902   -4.6639    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.9670   -3.9556    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   10.3249   -3.2122    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.9670   -2.4690    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.1627   -2.2853    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.5176   -2.7998    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.5176   -3.6248    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   10.7897   -2.5306    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.5094   -2.6204    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.0998   -1.7750    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    7.7743   -3.9827    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.0154   -4.6200    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    7.9410   -1.9478    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
    9.3450   -3.3404    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    9.4561   -3.3151    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   11.0345   -3.6219    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   10.0891   -1.6588    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    8.2364   -2.0302    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0 
  1  5  1  0  0  0  0 
  2  3  1  0  0  0  0 
  3  4  1  0  0  0  0 
  4  5  1  0  0  0  0 
  4 15  1  6  0  0  0 
  5  6  1  0  0  0  0 
  6  7  1  0  0  0  0 
  7  8  1  0  0  0  0 
  8  9  1  0  0  0  0 
  9 10  1  0  0  0  0 
 10  1  1  0  0  0  0 
 10 14  1  6  0  0  0 
 11  6  1  0  0  0  0 
 11  7  1  0  0  0  0 
 11 12  1  6  0  0  0 
 11 13  1  1  0  0  0 
  1 17  1  1  0  0  0 
  5 18  1  1  0  0  0 
  6 19  1  6  0  0  0 
  7 20  1  6  0  0  0 
  9 21  1  1  0  0  0 
  9 16  1  6  0  0  0 
M  END`;

describe('prediction', () => {
  it('predict a molecule that exist in the DB', () => {
    let files = readdirSync(join(__dirname, './oneMoleculeDB')).filter((file) =>
      file.match(/^\d+[A-Z][a-z]?\.json/),
    );
    const databases = {};
    for (let file of files) {
      databases[file.replace('.json', '')] = JSON.parse(
        readFileSync(join(__dirname, './oneMoleculeDB', file)),
      );
    }
    let { joinedSignals } = predict(molfileInDB, { nucleus: '1H', databases });

    expect(joinedSignals[0].delta !== undefined).toBe(true);
    expect(joinedSignals).toHaveLength(17);

    const expectedProtonDelta = [0.31, 0.71, 0.93, 1, 1.08, 1.1, 1.13, 1.27, 1.6, 1.69, 1.72, 1.76, 1.9, 2.16, 2.26, 3.8];
    joinedSignals.sort((a, b) => a.delta - b.delta);
    console.log(joinedSignals);
    console.log(joinedSignals.map(e => e.delta))
    for (let i = 0; i < 17; i++) {
      expect(joinedSignals[i].delta).toStrictEqual(expectedProtonDelta[i])
    }

    let { joinedSignals: carbonSignals } = predict(molfileInDB, {
      nucleus: '13C',
      databases,
    });
    expect(carbonSignals[0].delta !== undefined).toBe(true);
    //there is two signals with the same CS but differents diaID.
    expect(carbonSignals).toHaveLength(15);

    const expectedCarbonDelta = [
      15.86, 15.86, 16.3, 17.9, 20.6, 23.2, 25.6, 28.7, 29.4, 30.8, 37.9, 41.4,
      43, 50, 75.7,
    ];
    carbonSignals.sort((a, b) => a.delta - b.delta);
    for (let i = 0; i < 15; i++) {
      expect(carbonSignals[i].delta).toStrictEqual(expectedCarbonDelta[i])
    }
  });
});
