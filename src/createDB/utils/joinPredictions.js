import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import max from 'ml-array-max';
import mean from 'ml-array-mean';
import median from 'ml-array-median';
import min from 'ml-array-min';
import std from 'ml-array-standard-deviation';

export function joinPredictions(target) {
  let files = readdirSync(target).filter((file) =>
    file.match(/^part.*json$/),
  );

  let results = {};

  for (let file of files) {
    let data = JSON.parse(
      readFileSync(join(target, file), 'utf8'),
    );
    for (let datum of data) {
      if (!results[datum.nucleus]) {
        results[datum.nucleus] = new Array(5).fill(0).map(() => ({}));
      }
      let target = results[datum.nucleus][datum.sphere];
      if (!target[datum.oclID]) target[datum.oclID] = [];
      target[datum.oclID].push(datum.delta);
    }
  }

  for (let nucleus in results) {
    for (let sphere = 0; sphere < 5; sphere++) {
      for (let key in results[nucleus][sphere]) {
        results[nucleus][sphere][key] = {
          mean: mean(results[nucleus][sphere][key]),
          median: median(results[nucleus][sphere][key]),
          min: min(results[nucleus][sphere][key]),
          max: max(results[nucleus][sphere][key]),
          std: std(results[nucleus][sphere][key]),
          nb: results[nucleus][sphere][key].length,
        };
      }
    }
  }

  for (let nucleus in results) {
    writeFileSync(
      join(target, `${nucleus}.json`),
      JSON.stringify(results[nucleus]),
    );
  }
}
