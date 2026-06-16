import "@testing-library/jest-dom";

if (!globalThis.crypto) {
  globalThis.crypto = {} as Crypto;
}
if (typeof globalThis.crypto.randomUUID !== "function") {
  globalThis.crypto.randomUUID =
    (): `${string}-${string}-${string}-${string}-${string}` => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replaceAll(/[xy]/g, (c) => {
        const r = Math.trunc(Math.random() * 16),
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }) as `${string}-${string}-${string}-${string}-${string}`;
    };
}
