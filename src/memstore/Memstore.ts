export class MemStore<K,V> {
    private store: Map<K,V>;
    constructor() {
        this.store = new Map<K,V>();
    }

    set(key: K, value: V): void {
        this.store.set(key, value);
    }

    get(key: K): V | undefined {
        return this.store.get(key);
    }

    has(key: K): boolean {
        return this.store.has(key);
    }

    delete(key: K): boolean  {
        return this.store.delete(key);
    }

    clear(): void {
        this.store.clear();
    }

    size(): number {
        return this.store.size;
    }

    entries(): [K, V][] {
        return Array.from(this.store.entries());
    }
}
