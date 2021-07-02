export function queryByHose(input, db, options) {
  const { nucleus, levels, deltaByMean, keepHose, ignoreLabile } = options;

  levels.sort((a, b) => b - a);
  const atomLabel = nucleus.replace(/\d/g, '');
  const toReturn = [];

  for (const element of input.diaIDs) {
    if (
      element.atomLabel === atomLabel &&
      (!element.isLabile || !ignoreLabile)
    ) {
      let res;
      let k = 0;
      while (!res && k < levels.length) {
        if (db[levels[k] - 1]) {
          res = db[levels[k] - 1][element.hose[levels[k] - 1]];
        }
        k++;
      }
      if (!res) {
        res = { delta: null, nb: 0, std: 0, min: 0, max: 0 };
        k = 0;
      }

      for (const atomNumber of element.atoms) {
        let atom = { diaIDs: [element.oclID] };
        atom.atomLabel = atomLabel;
        atom.level = levels[k - 1];
        atom.delta = deltaByMean ? res.mean : res.median;
        atom.atomIDs = [atomNumber];
        atom.nb = res.nb;
        atom.std = res.std;
        atom.min = res.min;
        atom.max = res.max;
        atom.nbAtoms = 1;

        if (keepHose) {
          atom.hose = element.hose;
        }

        toReturn.push(atom);
      }
    }
  }

  return toReturn;
}
