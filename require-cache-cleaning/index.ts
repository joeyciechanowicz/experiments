import { inspect } from "util";

require("./a");

function printChildren(entry) {
  return {
    id: entry.id,
    children: entry.children.map(printChildren),
  };
}
// console.log(
//   inspect(
//     printChildren(require.cache[require.resolve("./a")]),
//     false,
//     null,
//     true
//   )
// );

function evictFile(rootRequiredFile: string, filename: string) {
  const fullPath = require.resolve(filename);

  const result = new Set<string>();
  const visited = new Set<string>();

  const dfs = (
    current: NodeModule,
    dependencyToEvict: string,
    currentPath: string[]
  ) => {
    if (current.id === dependencyToEvict) {
      currentPath.forEach((x) => result.add(x));
    }

    if (visited.has(current.id)) {
      return;
    }

    const newPath = currentPath.concat(current.id);
    current.children.forEach((child) => dfs(child, dependencyToEvict, newPath));
  };

  dfs(require.cache[require.resolve(rootRequiredFile)], fullPath, []);

  result.add(fullPath);

  [...result.values()].forEach((entry) => delete require.cache[entry]);
}

evictFile("./a", "./c");
console.log("---evicted---");

require("./a");
