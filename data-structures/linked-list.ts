interface LinkedListNode<K, V> {
  value: V;
  key: K;
  next?: LinkedListNode<K, V>;
}

export class LinkedList<K, V> {
  head?: LinkedListNode<K, V>;
  tail?: LinkedListNode<K, V>;

  constructor() {}

  append(key: K, value: V): LinkedList<K, V> {
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

  prepend(key: K, value: V): LinkedList<K, V> {
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

  remove(key: K): boolean {
    if (!this.head) {
      return false;
    }

    let curr: LinkedListNode<K, V> | undefined = this.head;
    if (curr.key === key) {
      this.head = curr.next;
      if (curr.next === undefined) {
        this.tail = undefined;
      }

      return true;
    }

    while (curr !== undefined) {
      if (curr.next && curr.next.key === key) {
        if (this.tail === curr.next) {
          curr.next = undefined;
          this.tail = curr;
        } else {
          curr.next = curr.next.next;
        }

        return true;
      }

      curr = curr.next;
    }

    return false;
  }

  contains(key: K): boolean {
    return this.get(key) !== undefined;
  }

  get(key: K): V | undefined {
    let curr: LinkedListNode<K, V> | undefined = this.head;
    while (curr) {
      if (curr.key === key) {
        return curr.value;
      }

      curr = curr.next;
    }

    return undefined;
  }

  values(): V[] {
    const items: V[] = [];

    let curr: LinkedListNode<K, V> | undefined = this.head;
    while (curr) {
      items.push(curr.value);

      curr = curr.next;
    }

    return items;
  }

  keys(): K[] {
    const items: K[] = [];

    let curr: LinkedListNode<K, V> | undefined = this.head;
    while (curr) {
      items.push(curr.key);

      curr = curr.next;
    }

    return items;
  }

  entries(): [K, V][] {
    const entries: [K, V][] = [];

    let curr: LinkedListNode<K, V> | undefined = this.head;
    while (curr) {
      entries.push([curr.key, curr.value]);

      curr = curr.next;
    }

    return entries;
  }
}
