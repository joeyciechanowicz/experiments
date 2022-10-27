type Key = string | number;

interface LinkedListNode<T> {
  value: T;
  key: Key;
  next?: LinkedListNode<T>;
}

export class LinkedList<T> {
  head?: LinkedListNode<T>;
  tail?: LinkedListNode<T>;

  constructor() {}

  append(key: Key, value: T): LinkedList<T> {
    if (!this.head && !this.tail) {
      this.head = {
        key,
        value,
        next: undefined,
      };
      this.tail = this.head;
    } else {
      this.tail!.next = {
        key,
        value,
        next: undefined,
      };
      this.tail = this.tail!.next;
    }
    return this;
  }

  prepend(key: Key, value: T): LinkedList<T> {
    if (!this.head && !this.tail) {
      this.head = {
        key,
        value,
        next: undefined,
      };
      this.tail = this.head;
    } else {
      const newHead = {
        key,
        value,
        next: this.head,
      };
      this.head = newHead;
    }
    return this;
  }

  remove(key: Key): LinkedList<T> {
    if (!this.head) {
      return this;
    }

    let curr: LinkedListNode<T> | undefined = this.head;
    if (curr.key === key) {
      this.head = curr.next;
      if (curr.next === undefined) {
        this.tail = undefined;
      }

      return this;
    }

    while (curr !== undefined) {
      if (curr.next && curr.next.key === key) {
        if (this.tail === curr.next) {
          curr.next = undefined;
          this.tail = curr;
        } else {
          curr.next = curr.next.next;
        }

        return this;
      }

      curr = curr.next;
    }

    return this;
  }

  contains(key: Key): boolean {
    return this.get(key) !== undefined;
  }

  get(key: Key): T | undefined {
    let curr: LinkedListNode<T> | undefined = this.head;
    while (curr) {
      if (curr.key === key) {
        return curr.value;
      }

      curr = curr.next;
    }

    return undefined;
  }

  values(): T[] {
    const items: T[] = [];

    let curr: LinkedListNode<T> | undefined = this.head;
    while (curr) {
      items.push(curr.value);

      curr = curr.next;
    }

    return items;
  }

  keys(): Key[] {
    const items: Key[] = [];

    let curr: LinkedListNode<T> | undefined = this.head;
    while (curr) {
      items.push(curr.key);

      curr = curr.next;
    }

    return items;
  }

  entries(): [Key, T][] {
    const entries: [Key, T][] = [];

    let curr: LinkedListNode<T> | undefined = this.head;
    while (curr) {
      entries.push([curr.key, curr.value]);

      curr = curr.next;
    }

    return entries;
  }
}
