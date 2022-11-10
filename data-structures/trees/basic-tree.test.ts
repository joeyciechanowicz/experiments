import { findFirst, TreeNode } from "./basic-tree";

const construct = (): TreeNode<string> => {
  const root = new TreeNode("root");

  const childLeft1 = new TreeNode("child-left-1");
  const childRight1 = new TreeNode("child-right-1");
  root.addChildren(childLeft1, childRight1);

  const grandchildLeaf1 = new TreeNode("gchild-leaf-1");
  const grandchildLeaf2 = new TreeNode("gchild-leaf-2");
  childLeft1.addChildren(grandchildLeaf1, grandchildLeaf2);

  return root;
};

describe("Basic tree", () => {
  it("Lets us construct a tree", () => {
    const root = construct();

    expect(root.children).toHaveLength(2);
    expect(root.children[0].value).toBe("child-left-1");
    expect(root.children[1].value).toBe("child-right-1");

    expect(root.children[0].children).toHaveLength(2);
    expect(root.children[0].children[0].value).toBe("gchild-leaf-1");
    expect(root.children[0].children[1].value).toBe("gchild-leaf-2");
  });

  describe("findFirst", () => {
    it("Lets us search the tree", () => {
      const root = construct();
      const result = findFirst(root, "child-right-1");

      expect(result).not.toBeUndefined();
      expect(result?.value).toEqual("child-right-1");
    });

    it("Lets us search the tree for the root node", () => {
      const root = construct();
      const result = findFirst(root, "root");

      expect(result).not.toBeUndefined();
      expect(result?.value).toEqual("root");
    });

    it("returns undefined when the value doesnt exist", () => {
      const root = construct();
      expect(findFirst(root, "asdf")).toBeUndefined();
    });

    it("handles trees with cycles", () => {
      const root = new TreeNode("root");

      const childLeft1 = new TreeNode("child-left-1");
      const childRight1 = new TreeNode("child-right-1");
      root.addChildren(childLeft1, childRight1);

      const grandchildLeaf1 = new TreeNode("gchild-leaf-1");
      const grandchildLeaf2 = new TreeNode("gchild-leaf-2");
      childLeft1.addChildren(grandchildLeaf1, grandchildLeaf2);

      grandchildLeaf2.addChildren(root);

      expect(() => findFirst(root, "asdf")).toThrowError("Tree has a cycle");
    });
  });
});
