 /**
 * Process the sdf fields
 */
  export default function getNMR(entry) {
  let results = [];
  // find the number of entries
  let totalNumber = 0;
  for (let key in entry) {
    if (key.match(/\d$/)) {
      let end = Number(key.replace(/^.* /, ''));
      if (end + 1 > totalNumber) totalNumber = end + 1;
    }
  }
  for (let i = 0; i < totalNumber; i++) {
    results.push({
      id: Number(entry['nmrshiftdb2 ID']),
      temperature: undefined,
      solvent: undefined,
      nucleus: undefined,
      assignmentString: undefined,
      field: undefined,
    });
  }

  for (let key in entry) {
    if (key === 'nmrshiftdb2 ID') {
      // do nothing
    } else if (key.match(/Spectrum.*\d$/)) {
      // this is an assignment
      let index = Number(key.replace(/.* /, ''));
      if (!results[index]) continue;
      results[index].nucleus = key.replace(/Spectrum (.*) .*/, '$1');
      results[index].assignmentString = entry[key];
    } else {
      switch (key) {
        case 'Temperature [K]':
          {
            let temperatures = entry[key].split(/(?=\d:)/).map((v) => v.trim());
            for (let temperaturePart of temperatures) {
              let index = Number(temperaturePart.replace(/:.*/, ''));
              if (!results[index]) continue;
              let temperature = temperaturePart.replace(/.*:/, '');
              if (!isNaN(temperature)) {
                results[index].temperature = Number(temperature);
              }
            }
          }
          break;
        case 'Field Strength [MHz]':
          {
            let parts = entry[key].split(/(?=\d:)/).map((v) => v.trim());
            for (let fieldPart of parts) {
              let index = Number(fieldPart.replace(/:.*/, ''));
              if (!results[index]) continue;
              let field = fieldPart.replace(/.*:/, '');
              if (!isNaN(field)) {
                results[index].field = Number(field);
              }
            }
          }
          break;
        case 'Solvent':
          {
            let parts = entry[key].split(/(?=\d:)/).map((v) => v.trim());
            for (let solventPart of parts) {
              let index = Number(solventPart.replace(/:.*/, ''));
              if (!results[index]) continue;
              let solvent = solventPart.replace(/.*:/, '');
              if (solvent !== 'Unreported') {
                results[index].solvent = solvent;
              }
            }
          }
          break;
        case 'molfile':
          break;
        case 'Assignment Method':
          break;
        default:
          console.log('Unknown: ', key);
      }
    }
  }
  return results;
}
