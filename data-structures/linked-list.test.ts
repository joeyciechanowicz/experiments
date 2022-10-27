import { LinkedList } from "./linked-list";

const listOf4 = () => {
  const list = new LinkedList<string>();

  list.append(1, "my item 1");
  list.append(2, "my item 2");
  list.append(3, "my item 3");
  list.append(4, "my item 4");
  return list;
};

describe("linked-list", () => {
  it("should let us add an item", () => {
    const list = new LinkedList<string>();

    list.append("key", "my item");

    expect(list.entries()).toEqual([["key", "my item"]]);
  });

  it("should let us add lost of items", () => {
    const list = new LinkedList<string>();

    list
      .append(1, "my item 1")
      .append(2, "my item 2")
      .append(3, "my item 3")
      .append(4, "my item 4");

    expect(list.entries()).toEqual([
      [1, "my item 1"],
      [2, "my item 2"],
      [3, "my item 3"],
      [4, "my item 4"],
    ]);
  });

  it("should let prepend an item", () => {
    const list = listOf4();

    list.prepend("start", "start");

    expect(list.entries()).toEqual([
      ["start", "start"],
      [1, "my item 1"],
      [2, "my item 2"],
      [3, "my item 3"],
      [4, "my item 4"],
    ]);
  });

  it("should find an item", () => {
    const list = listOf4();

    expect(list.contains(4)).toBe(true);
  });

  it("should get an item", () => {
    const list = listOf4();

    expect(list.get(4)).toBe("my item 4");
  });

  it("should remove the last item", () => {
    const list = listOf4();

    list.remove(4);
    expect(list.entries()).toEqual([
      [1, "my item 1"],
      [2, "my item 2"],
      [3, "my item 3"],
    ]);
  });

  it("should remove the first item", () => {
    const list = listOf4();

    list.remove(1);
    expect(list.entries()).toEqual([
      [2, "my item 2"],
      [3, "my item 3"],
      [4, "my item 4"],
    ]);
  });

  it("should remove a middle item", () => {
    const list = listOf4();

    list.remove(2);
    expect(list.values()).toEqual(["my item 1", "my item 3", "my item 4"]);
  });

  it("should remove the only item in a list", () => {
    const list = new LinkedList<string>();
    list.append(1, "first");

    list.remove(1);
    expect(list.entries()).toEqual([]);
  });

  it("should let us remove the only item in a list, then let us add an item", () => {
    const list = new LinkedList<string>();
    list.append(1, "first");
    list.remove(1);
    list.append(2, "second");
    list.append(3, "third");

    expect(list.entries()).toEqual([
      [2, "second"],
      [3, "third"],
    ]);
  });

  describe("after removing some stuff", () => {
    it("lets us add some stuff", () => {
      const list = listOf4();

      list.remove(1).remove(4).prepend("start", "start").append("end", "end");
      expect(list.entries()).toEqual([
        ["start", "start"],
        [2, "my item 2"],
        [3, "my item 3"],
        ["end", "end"],
      ]);
    });
  });
});
