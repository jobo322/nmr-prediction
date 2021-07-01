import { join } from 'fs';

import processFile from '../utils/processSDFFiles/processFile';

function test() {
  processFile(join(__dirname, '../data/medium.sdf'));
}

test();
