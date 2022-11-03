export const a = 5;

it("sets", () => {
  const map = new Map<Symbol, string>();

  const key1 = Symbol("joey");
  const key2 = Symbol("and");

  map.set(key1, "asd");
  map.set(key2, "gdsf");

  console.log(map);
});
