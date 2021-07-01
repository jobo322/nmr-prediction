import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import JSZip from 'jszip';

const target = join(__dirname, '../../output');
if (!existsSync(target)) {
  mkdirSync(target);
}

async function split() {
  const zippedSDF = readFileSync(
    join(__dirname, '../../data/2020-06-27.sdf.zip'),
  );
  const jsZip = new JSZip();
  // more files !
  const zip = await jsZip.loadAsync(zippedSDF);

  let sdf = await zip.file(Object.keys(zip.files)[0]).async('string');

  let molecules = sdf.split('$$$$\r\n');
  let current = [];
  let i = 0;
  for (; i < molecules.length; i++) {
    current.push(molecules[i]);
    if (i % 1000 === 0 && i > 0) {
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

split();
