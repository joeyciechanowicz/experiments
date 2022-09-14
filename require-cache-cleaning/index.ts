import fs from "fs";
import path from "path";
import { DAG } from "./DAG";

const dependencies = new DAG();
// const dependencies = new DepGraph();
const exportsCache = new Map<string, unknown>();

// filename must be resolved already
const uncachedRequire = (filename) => {
  const exports = {};
  const module = { exports };
  const source = fs.readFileSync(filename);

  dependencies.addNode(filename);

  // https://github.com/nodejs/node/blob/main/lib/internal/modules/cjs/loader.js#L212-L215
  new Function(
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
    source as unknown as string
  )(
    exports,
    (childDependency: string) => {
      const resolvedChild = require.resolve(childDependency);
      if (resolvedChild.indexOf("/node_modules/") !== -1) {
        return require(resolvedChild);
      }

      dependencies.addNode(resolvedChild);
      dependencies.addDependency(filename, resolvedChild);

      // if we've required this child before, serve the cached value
      if (exportsCache.has(resolvedChild)) {
        return exportsCache.get(resolvedChild);
      }

      return uncachedRequire(resolvedChild);
    },
    module,
    filename,
    path.dirname(filename)
  );

  // make sure we cache things, otherwise we'll be re-evaluating every file every time and not getting shared values
  exportsCache.set(filename, module.exports);

  return module.exports;
};

// recursively walk looking for any dependency paths
function clearCacheItem(fileToRemove) {
  const dependents = dependencies.dependents(fileToRemove);

  console.log("dependents", dependents);
  dependents.forEach((filename) => {
    dependencies.removeNode(filename);
    exportsCache.delete(filename);
  });
}

const a = uncachedRequire(require.resolve("./a.js"));

console.log("result", a);

// console.log(dependencies);

clearCacheItem(require.resolve("./c"));
console.log("############# cleared ##############");

const aNew = uncachedRequire(require.resolve("./a.js"));

console.log(aNew);

// console.log(dependencies);
