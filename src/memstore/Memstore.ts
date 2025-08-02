export class MemStore<T> {
    private store: Map<string, T>;
    constructor() {
        this.store = new Map<string, T>();
    }

    set(key: string, value: T): void {
        this.store.set(key, value);
    }

    get(key: string): T | undefined {
        return this.store.get(key);
    }

    has(key: string): boolean {
        return this.store.has(key);
    }

    delete(key: string): boolean  {
        return this.store.delete(key);
    }

    clear(): void {
        this.store.clear();
    }

    size(): number {
        return this.store.size;
    }

    entries(): [string, T][] {
        return Array.from(this.store.entries());
    }
}
