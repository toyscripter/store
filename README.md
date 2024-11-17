# Store

`Store` is a lightweight wrapper around IndexedDB that provides a simple, asynchronous API for storing and retrieving key-value pairs in the browser. It is designed to make working with IndexedDB straightforward.

## Features

- Uses IndexedDB for persistent storage.
- Supports storing any serializable data as values.
- Simple and clean API: `set`, `get`.
- Works asynchronously for non-blocking operations.

## Usage Example

```ts
import { ToyStore } from "./mod.ts";

const store = new ToyStore("MyDatabase", "MyStore");

// Set a key-value pair
await store.set("username", "JohnDoe");

// Get the value associated with a key
const username = await store.get<string>("username");
console.log(username); // Output: JohnDoe

// Update an existing key
await store.set("username", "JaneDoe");
const updatedUsername = await store.get<string>("username");
console.log(updatedUsername); // Output: JaneDoe

// Retrieve a non-existent key
const unknownKey = await store.get<string>("unknownKey");
console.log(unknownKey); // Output: undefined
```
