import { predict } from '../predict';
import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';

const molfile = `(1S,10S)-9alpha-hydroxy-allo-aromadendrane
  CDKD
nmrshiftdb2 2459
 21 23  0  0  0  0  0  0  0  0999 V2000
    9.1627   -4.1392    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.0887   -4.9608    0.0000 C   0  0  0  0  0  2  0  0  0  0  0  0
    9.8474   -5.2851    0.0000 C   0  0  0  0  0  2  0  0  0  0  0  0
   10.3902   -4.6639    0.0000 C   0  0  0  0  0  3  0  0  0  0  0  0
    9.9670   -3.9556    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   10.3249   -3.2122    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.9670   -2.4690    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.1627   -2.2853    0.0000 C   0  0  0  0  0  2  0  0  0  0  0  0
    8.5176   -2.7998    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.5176   -3.6248    0.0000 C   0  0  0  0  0  3  0  0  0  0  0  0
   10.7897   -2.5306    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.5094   -2.6204    0.0000 C   0  0  0  0  0  1  0  0  0  0  0  0
   11.0998   -1.7750    0.0000 C   0  0  0  0  0  1  0  0  0  0  0  0
    7.7743   -3.9827    0.0000 C   0  0  0  0  0  1  0  0  0  0  0  0
   11.0154   -4.6200    0.0000 C   0  0  0  0  0  1  0  0  0  0  0  0
    7.9410   -1.9478    0.0000 O   0  0  0  0  0  1  0  0  0  0  0  0
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
    let { joinedSignals, signals } = predict(molfile, { nucleus: '1H', databases });
    console.log(signals)
    expect(joinedSignals[0].delta !== undefined).toBe(false);
  });
});
