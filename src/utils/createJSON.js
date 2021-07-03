import { readdirSync } from 'fs';
import { join, resolve } from 'path';

import Piscina from 'piscina';

function createJSON() {
  let files = readdirSync(join(__dirname, '../../output')).filter((file) =>
    file.match(/sdf$/),
  );

  const piscina = new Piscina({
    filename: resolve(join(__dirname, './processSDFFiles/processFile.js')),
    maxThreads: 5,
  });

  for (let file of files) {
    piscina.run(join(__dirname, '../../output', file));
  }
}

createJSON();
