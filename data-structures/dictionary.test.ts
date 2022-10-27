import { Dictionary } from "./dictionary";

const dictOfN = (
  n: number,
  keyFunc: (i: number) => any = (i) => `key${i}`,
  valFunc: (i: number) => any = (i) => `val${i}`
) =>
  [...Array(n)].reduce<Dictionary<any, any>>(
    (dict, _, i) => (dict.add(keyFunc(i), valFunc(i)), dict),
    new Dictionary<any, any>()
  );

describe("Dictionary", () => {
  it("should let us store a value", () => {
    const dict = new Dictionary<string, string>();

    dict.add("mykey", "ian");

    expect(dict.entries()).toEqual([["mykey", "ian"]]);
  });

  it("should let us store multiple values", () => {
    const dict = new Dictionary<string, string>();

    dict.add("key1", "val1");
    dict.add("key2", "val2");

    expect(dict.entries()).toEqual([
      ["key1", "val1"],
      ["key2", "val2"],
    ]);
  });

  it("should handle collisions", () => {
    // create a dictionary with 1 bucket, to force collisions
    const dict = new Dictionary<string, string>(1);

    dict.add("key1", "val1");
    dict.add("key2", "val2");
    dict.add("key3", "val3");

    expect(dict.entries()).toEqual([
      ["key1", "val1"],
      ["key2", "val2"],
      ["key3", "val3"],
    ]);
  });

  it("should get the keys", () => {
    const dict = dictOfN(10, (i) => i);

    expect(dict.keys()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should get the values", () => {
    const dict = dictOfN(10, undefined, (i) => i);

    const values = [...dict.values()];
    values.sort();
    expect(values).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should check an entry exists", () => {
    const dict = dictOfN(4);

    expect(dict.contains("key3")).toBe(true);
    expect(dict.contains("not in there")).toBe(false);
  });

  it("should get an entry", () => {
    const dict = dictOfN(4);

    expect(dict.get("key3")).toEqual("val3");
  });

  it("should remove an entry", () => {
    const dict = dictOfN(4);

    dict.remove("key2");

    expect(dict.entries()).toEqual([
      ["key0", "val0"],
      ["key1", "val1"],
      ["key3", "val3"],
    ]);
  });

  it("should return whether an item was removed", () => {
    const dict = dictOfN(4);

    expect(dict.remove("key2")).toBe(true);
    expect(dict.remove("key2")).toBe(false);
  });

  it("should clear the dictionary", () => {
    const dict = dictOfN(5);

    dict.clear();

    expect(dict.entries()).toEqual([]);
  });

  it("should store objects by reference", () => {
    const dict = new Dictionary<number, any>();

    dict.add(1, 1);
    dict.add(2, 2);
    dict.add(3, { complex: { value: "hello" } });

    dict.get(3).complex.value = "world";

    expect(dict.entries()).toEqual([
      [1, 1],
      [2, 2],
      [3, { complex: { value: "world" } }],
    ]);
  });
});
