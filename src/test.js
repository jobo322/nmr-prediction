import { join } from 'fs';

import processFile from './processFile';

function test() {
  processFile(join(__dirname, '../data/medium.sdf'));
}

test();
