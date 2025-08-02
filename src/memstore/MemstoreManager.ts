import {MemStore} from "./Memstore";

export class MemstoreManager {
    private stores = new Map<string, MemStore<any>>();

    Get<T>(name: string): MemStore<T> {
        if (!this.stores.has(name)) {
            this.stores.set(name, new MemStore<T>());
        }
        return this.stores.get(name) as MemStore<T>;
    }
}