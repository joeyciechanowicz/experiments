require("./a");

type ParentMap = Map<string, Set<string>>;
const computeParentMap = (): ParentMap => {
  const out: ParentMap = new Map();
  Object.values(require.cache)
    .filter((x) => x.filename.indexOf("/node_modules/") === -1)
    .forEach(({ filename: parent, children }) => {
      children
        .filter((x) => x.filename.indexOf("/node_modules/") === -1)
        .forEach(({ filename: child }) => {
          const parents = out.get(child);
          if (parents) {
            parents.add(parent);
          } else {
            out.set(child, new Set([parent]));
          }
        });
    });
  return out;
};

const evictFromCache = (file: string, parentMap: ParentMap) => {
  const resolved = require.resolve(file);

  parentMap.get(resolved)?.forEach((parent) => {
    evictFromCache(parent, parentMap);
  });

  // don't delete ourselves
  if (file === __filename) {
    return;
  }

  console.log(`evicting ${resolved}`);
  delete require.cache[resolved];
};

// evictFile("./a", "./c");
// console.log("---evicted---");

const parentMap = computeParentMap();
console.log(parentMap);
evictFromCache("./c", parentMap);

const debounceBatch = (cb, amount) => {
  let timeout;
  let buffer = [];

  return (...args) => {
    clearTimeout(timeout);
    buffer.push(args);

    setTimeout(() => {
      cb(buffer);
      buffer = [];
    }, amount);
  };
};

console.log("----------evicted----------");

require("./a");
