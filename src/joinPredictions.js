import { readdirSync, readFileSync, fstat, writeFileSync } from 'fs';
import { join } from 'path';
import median from 'ml-array-median';

function joinPredictions() {
  let files = readdirSync(join(__dirname, '../output')).filter((file) =>
    file.match(/json$/),
  );

  let results = {};

  for (let file of files) {
    let data = JSON.parse(
      readFileSync(join(__dirname, '../output', file), 'utf8'),
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
        results[nucleus][sphere][key] = median(results[nucleus][sphere][key]);
      }
    }
  }

  for (let nucleus in results) {
    writeFileSync(
      join(__dirname, '../output/' + nucleus + '.json'),
      JSON.stringify(results[nucleus]),
    );
  }
}

joinPredictions();
