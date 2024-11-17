/**
 * This module contains a contructor for an object that can set and get values from indexedDB.
 * @module
 */

export class ToyStore {
  private dbName: string;
  private storeName: string;

  constructor(dbName: string = "ToyStoreDB", storeName: string = "ToyStore") {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  /** Initialize the database and object store */
  private initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /** Set a key-value pair in the storage */
  async set(key: string, value: unknown): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.put(value, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /** Get the value associated with a key from the storage */
  async get<T>(key: string): Promise<T | undefined> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result as T);
      request.onerror = () => reject(request.error);
    });
  }
}
