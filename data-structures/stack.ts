export class Stack<T> {
  private stack: T[] = [];

  constructor() {}

  push(item: T) {
    this.stack.push(item);
  }

  pop(): T | undefined {
    if (this.stack.length > 0) {
      const last = this.stack[this.stack.length - 1];
      this.stack = this.stack.slice(0, -1);
      return last;
    }
  }

  peek(): T | undefined {
    return this.stack[this.stack.length - 1];
  }

  toArray(): T[] {
    return this.stack;
  }

  size(): number {
    return this.stack.length;
  }
}
