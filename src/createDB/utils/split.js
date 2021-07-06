import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { cpus } from 'os';

import JSZip from 'jszip';

export async function split(props) {

  const {pathToData, target } = props
  if (!existsSync(target)) {
    mkdirSync(target);
  }

  const zippedSDF = readFileSync(
    pathToData,
  );
  const jsZip = new JSZip();
  // more files !
  const zip = await jsZip.loadAsync(zippedSDF);

  let sdf = await zip.file(Object.keys(zip.files)[0]).async('string');

  let molecules = sdf.split('$$$$\r\n');

  let numberOfMoleculesPerFile = Math.max(
    1,
    Math.floor(molecules.length / Math.pow(cpus().length - 1, 2)),
  );

  let i = 0;
  let current = [];
  for (; i < molecules.length; i++) {
    current.push(molecules[i]);
    if (i % numberOfMoleculesPerFile === 0 && i > 0) {
      writeFileSync(
        join(target, `part-${i}.sdf`),
        current.join('$$$$\n').replace(/\r/g, ''),
      );
      current = [];
    }
  }
  writeFileSync(
    join(target, `part-${i}.sdf`),
    current.join('$$$$\n').replace(/\r/g, ''),
  );
}
