export class TreeNode<T> {
  public readonly children: TreeNode<T>[];
  public readonly value: T;

  constructor(value: T) {
    this.children = [];
    this.value = value;
  }

  addChildren(...nodes: TreeNode<T>[]): void {
    for (let child of nodes) {
      this.children.push(child);
    }
  }
}

function dfs<T>(
  current: TreeNode<T>,
  searchTerm: T,
  visited: Set<TreeNode<T>>
): TreeNode<T> | undefined {
  if (visited.has(current)) {
    throw new Error("Tree has a cycle");
  }

  visited.add(current);

  if (current.value === searchTerm) {
    return current;
  }

  for (let child of current.children) {
    const result = dfs(child, searchTerm, visited);
    if (result) {
      return result;
    }
  }

  return undefined;
}

export function findFirst<T>(
  start: TreeNode<T>,
  searchTerm: T
): TreeNode<T> | undefined {
  const visited = new Set<TreeNode<T>>();
  return dfs(start, searchTerm, visited);
}
