import { readdirSync } from 'fs';
import { cpus } from 'os';
import { join, resolve } from 'path';

import Piscina from 'piscina';

import { joinPredictions } from './utils/joinPredictions';
import { split } from './utils/split';

(async () => {
  // const sdfFile = join(__dirname, '../../data/oneMolecule.zip');
  const sdfFile = join(__dirname, '../../data/2020-06-27.sdf.zip');
  const target = join(__dirname, '../../output2');

  await split({ pathToData: sdfFile, target });

  let files = readdirSync(target).filter((file) => file.match(/sdf$/));

  const piscina = new Piscina({
    filename: resolve(
      join(__dirname, './utils/processSDFFiles/processFile.js'),
    ),
    maxThreads: Math.max(cpus().length - 2, 1),
    idleTimeout: 90,
  });

  let promises = [];
  for (let file of files) {
    promises.push(piscina.run(join(target, file)));
  }
  await Promise.all(promises);

  joinPredictions(target);
})();
