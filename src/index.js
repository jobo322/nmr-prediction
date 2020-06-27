import parseSDF from './parseSDF';
import { readFileSync, read } from 'fs';

import { join } from 'path';

export function doAll() {
  let sdfText = readFileSync(join(__dirname, '../data/test.sdf'), 'utf8');
  let results = parseSDF(sdfText);
  // console.log(results);
}

doAll();
