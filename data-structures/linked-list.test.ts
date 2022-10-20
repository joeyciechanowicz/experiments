import { LinkedList } from "./linked-list";

const listOf4 = () => {
  const list = new LinkedList<string>();

  list.append("my item 1");
  list.append("my item 2");
  list.append("my item 3");
  list.append("my item 4");
  return list;
};

describe("linked-list", () => {
  it("should let us add an item", () => {
    const list = new LinkedList<string>();

    list.append("my item");

    expect(list.toArray()).toEqual(["my item"]);
  });

  it("should let us add lost of items", () => {
    const list = new LinkedList<string>();

    list
      .append("my item 1")
      .append("my item 2")
      .append("my item 3")
      .append("my item 4");

    expect(list.toArray()).toEqual([
      "my item 1",
      "my item 2",
      "my item 3",
      "my item 4",
    ]);
  });

  it("should let prepend an item", () => {
    const list = listOf4();

    list.prepend("start");

    expect(list.toArray()).toEqual([
      "start",
      "my item 1",
      "my item 2",
      "my item 3",
      "my item 4",
    ]);
  });

  it("should find an item", () => {
    const list = listOf4();

    expect(list.contains("my item 4")).toBe(true);
  });

  it("should remove the last item", () => {
    const list = listOf4();

    list.remove("my item 4");
    expect(list.toArray()).toEqual(["my item 1", "my item 2", "my item 3"]);
  });

  it("should remove the first item", () => {
    const list = listOf4();

    list.remove("my item 1");
    expect(list.toArray()).toEqual(["my item 2", "my item 3", "my item 4"]);
  });

  it("should remove a middle item", () => {
    const list = listOf4();

    list.remove("my item 2");
    expect(list.toArray()).toEqual(["my item 1", "my item 3", "my item 4"]);
  });

  it("should the only item in a list", () => {
    const list = new LinkedList<string>();
    list.append("first");

    list.remove("first");
    expect(list.toArray()).toEqual([]);
  });

  it("should let us remove the only item in a list, then let us add an item", () => {
    const list = new LinkedList<string>();
    list.append("first");
    list.remove("first");
    list.append("second");
    list.append("third");

    expect(list.toArray()).toEqual(["second", "third"]);
  });

  describe("after removing some stuff", () => {
    it("lets us add some stuff", () => {
      const list = listOf4();

      list
        .remove("my item 1")
        .remove("my item 4")
        .prepend("start")
        .append("end");
      expect(list.toArray()).toEqual([
        "start",
        "my item 2",
        "my item 3",
        "end",
      ]);
    });
  });
});
