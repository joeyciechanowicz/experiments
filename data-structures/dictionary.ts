import { LinkedList } from "./linked-list";
import { createBuilderStatusReporter } from "./node_modules/typescript/lib/typescript";

const defaultSize = 32;

export class Dictionary<K extends { toString: () => string }, V> {
  private buckets: LinkedList<K, V>[];
  private size: number;

  constructor(size: number = defaultSize) {
    this.size = size;
    this.buckets = [...Array(size)].map(() => new LinkedList<K, V>());
  }

  private hashcode(str: K): number {
    const sum = Array.from(str.toString()).reduce<number>(
      (sum, char) => char.charCodeAt(0) + sum,
      0
    );
    return sum % this.size;
  }

  add(key: K, value: V): void {
    const hashcode = this.hashcode(key);

    this.buckets[hashcode].append(key, value);
  }

  remove(key: K): boolean {
    const hash = this.hashcode(key);
    return this.buckets[hash].remove(key);
  }

  get(key: K): V | undefined {
    const hash = this.hashcode(key);
    const value = this.buckets[hash].get(key);
    return value;
  }

  contains(key: K): boolean {
    return this.get(key) !== undefined;
  }

  clear(): void {
    this.buckets = [...Array(this.size)].map(() => new LinkedList<K, V>());
  }

  entries(): [K, V][] {
    return this.buckets
      .reduce<[K, V][]>((acc, curr) => {
        return acc.concat(curr.entries());
      }, [])
      .filter((x) => x.length > 0);
  }

  keys(): K[] {
    return this.buckets.reduce<K[]>((acc, curr) => {
      return acc.concat(curr.keys());
    }, []);
  }

  values(): V[] {
    return this.buckets.reduce<V[]>((acc, curr) => {
      return acc.concat(curr.values());
    }, []);
  }
}
