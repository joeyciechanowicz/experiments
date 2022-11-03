import { setConstantValue } from "./node_modules/typescript/lib/typescript";
import { Stack } from "./stack";

const stackOfN = (n: number) =>
  [...Array(n)].reduce(
    (stack, _, n) => (stack.push(n + 1), stack),
    new Stack<number>()
  );

describe("stack", () => {
  it("pushes items", () => {
    const stack = new Stack<string>();
    stack.push("a");
    stack.push("b");
    stack.push("c");
    stack.push("d");

    expect(stack.toArray()).toEqual(["a", "b", "c", "d"]);
  });

  it("pops items", () => {
    const stack = stackOfN(4);

    const item = stack.pop();

    expect(item).toBe(4);
    expect(stack.toArray()).toEqual([1, 2, 3]);
  });

  it("pops multiple items", () => {
    const stack = stackOfN(4);

    const i1 = stack.pop();
    const i2 = stack.pop();
    const i3 = stack.pop();
    const i4 = stack.pop();

    expect(i1).toBe(4);
    expect(i2).toBe(3);
    expect(i3).toBe(2);
    expect(i4).toBe(1);
    expect(stack.toArray()).toEqual([]);
  });

  it("popping an empty stack does nothing", () => {
    const stack = new Stack<string>();

    const item = stack.pop();
    expect(item).toBeUndefined();
  });

  it("peeks", () => {
    const stack = stackOfN(5);

    expect(stack.peek()).toBe(5);
    expect(stack.toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  it("peeks an empty stack", () => {
    const stack = new Stack<string>();

    expect(stack.peek()).toBe(undefined);
  });

  it("has a .size property", () => {
    const stack = stackOfN(10);

    expect(stack.size()).toBe(10);
  });

  it("lets you loop", () => {
    const stack = stackOfN(5);

    const items = [];
    let curr: number;
    while ((curr = stack.pop())) {
      items.push(curr);
    }
  });
});
