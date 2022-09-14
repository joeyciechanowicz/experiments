export class DAG {
  private nodes: Set<string> = new Set();
  private edgesIn: Map<string, Set<string>> = new Map(); // dependent
  private edgesOut: Map<string, Set<string>> = new Map(); // dependency

  addNode(node: string) {
    if (!this.nodes.has(node)) {
      this.nodes.add(node);

      this.edgesIn.set(node, new Set());
      this.edgesOut.set(node, new Set());
    }
  }

  // remove nodes and dependencies
  removeNode(node: string) {
    if (this.nodes.has(node)) {
      this.nodes.delete(node);
      this.edgesIn.delete(node);
      this.edgesOut.delete(node);

      for (const dependents of this.edgesIn.values()) {
        dependents.delete(node);
      }

      for (const dependencies of this.edgesOut.values()) {
        dependencies.delete(node);
      }
    }
  }

  /**
   * Adds a dependency between two nodes.
   * If the nodes don't exist, you'll get weird errors
   */
  addDependency(from: string, to: string) {
    this.edgesOut.get(from).add(to);
    this.edgesIn.get(to).add(from);
  }

  /**
   * Remove a dependency between two nodes.
   */
  removeDependency(from: string, to: string) {
    if (this.nodes.has(from)) {
      this.edgesOut.get(from).delete(to);
    }

    if (this.nodes.has(to)) {
      this.edgesIn.get(to).delete(from);
    }
  }

  // standard iterative depth first search
  dependents(node: string): string[] {
    const visited = new Set<string>();
    const result: string[] = [];

    // stack of nodes we still need to visit
    const stack = [{ node: node, seen: false }];

    while (stack.length > 0) {
      // peek
      const current = stack[stack.length - 1];

      if (!current.seen) {
        //
        const dependents = this.edgesIn.get(current.node);
        for (let dependent of dependents.values()) {
          if (!visited.has(dependent)) {
            stack.push({ node: dependent, seen: false });
          }
        }
        current.seen = true;
      } else {
        // Have visited edges (stack unrolling phase)
        stack.pop();
        visited.add(current.node);
        result.push(current.node);
      }
    }

    return result;
  }
}
