import { ToyStore } from "./dist/mod.esm.js";

/* ToyStore */
const storage = new ToyStore();

(async () => {
  await storage.set("myKey", "myValue");
  const value = await storage.get("myKey");
  console.log(value); // 'myValue'
})();

async function main() {
  const logs = await storage.get("logs") || []
  console.log(logs)

  async function test(data: { value: string }) {
    console.log(data)

    const logs = await storage.get("logs") || []
    console.log(logs)

    const newLogs = [...logs, data.value]

    await storage.set('logs', newLogs)

    console.log(newLogs)
  }

  test({value: 'test'})

  setTimeout(async () => {
    storage.set('logs', [])
    console.log('cleared')
    console.log(await storage.get("logs"))
  }, 1000)
}

main()