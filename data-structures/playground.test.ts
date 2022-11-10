export const a = 5;

it("sets", () => {
  const map = new Map<Symbol, string>();

  const key1 = Symbol("joey");
  const key2 = Symbol("and");

  map.set(key1, "asd");
  map.set(key2, "gdsf");

  console.log(map);
});

class Something {
  constructor(public a: string, public b: string) {}
}

it("set of objects", () => {
  const set = new Set<Something>();

  const a = new Something("a", "a-1");
  const b = new Something("b", "b-1");
  const c = new Something("c", "c-1");

  set.add(a);
  set.add(b);
  set.add(c);

  set.add(a);
  set.add(b);
  set.add(c);

  console.log(set);
});
