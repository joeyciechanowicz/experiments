interface LinkedListNode<T> {
  value: T;
  next?: LinkedListNode<T>;
}

export class LinkedList<T> {
  head?: LinkedListNode<T>;
  tail?: LinkedListNode<T>;

  constructor() {}

  append(item: T): LinkedList<T> {
    if (!this.head && !this.tail) {
      this.head = {
        value: item,
        next: undefined,
      };
      this.tail = this.head;
    } else {
      this.tail!.next = {
        value: item,
        next: undefined,
      };
      this.tail = this.tail!.next;
    }
    return this;
  }

  prepend(item: T): LinkedList<T> {
    if (!this.head && !this.tail) {
      this.head = {
        value: item,
        next: undefined,
      };
      this.tail = this.head;
    } else {
      const newHead = {
        value: item,
        next: this.head,
      };
      this.head = newHead;
    }
    return this;
  }

  remove(item: T): LinkedList<T> {
    if (!this.head) {
      return this;
    }

    let curr = this.head;

    if (curr.value === item) {
      this.head = curr.next;

      // sort out tail
      if (curr.next === undefined) {
        this.tail = undefined;
      }
      return this;
    }

    do {
      if (curr.next && curr.next.value === item) {
        if (this.tail === curr.next) {
          curr.next = undefined;
          this.tail = curr;
        } else {
          curr.next = curr.next.next;
        }

        return this;
      }

      if (curr.next) {
        curr = curr.next;
      } else {
        break;
      }
    } while (curr !== undefined);
    return this;
  }

  contains(item: T): boolean {
    if (!this.head) {
      return false;
    }

    let curr: LinkedListNode<T> | undefined = this.head;
    do {
      if (curr.value === item) {
        return true;
      }

      curr = curr.next;
    } while (curr !== undefined);
    return false;
  }

  toArray(): T[] {
    const items: T[] = [];

    if (!this.head) {
      return [];
    }

    let curr: LinkedListNode<T> | undefined = this.head;
    do {
      items.push(curr.value);

      curr = curr.next;
    } while (curr !== undefined);

    return items;
  }
}
