import {MemStore} from "./Memstore";

export class MemstoreManager {
    private static instance: MemstoreManager;
    private stores = new Map<string, MemStore<any, any>>();

    private constructor() {}

    public static getInstance(): MemstoreManager {
        if (!MemstoreManager.instance) {
            MemstoreManager.instance = new MemstoreManager();
        }
        return MemstoreManager.instance;
    }

    public Get<K, V>(name: string): MemStore<K, V> {
        if (!this.stores.has(name)) {
            this.stores.set(name, new MemStore<K, V>());
        }
        return this.stores.get(name) as MemStore<K, V>;
    }
}