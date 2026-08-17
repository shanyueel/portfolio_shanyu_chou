/**
 * Base64 <-> Int8Array conversion.
 *
 * Both directions run in Node (build scripts) and in the browser (runtime), so
 * each picks Buffer when it exists and falls back to btoa/atob otherwise.
 */

export function toBase64(bytes: Int8Array): string {
  const u8 = new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  if (typeof Buffer !== "undefined") return Buffer.from(u8).toString("base64")
  let binary = ""
  for (const byte of u8) binary += String.fromCharCode(byte)
  return btoa(binary)
}

export function fromBase64(base64: string): Int8Array {
  if (typeof Buffer !== "undefined") {
    const buf = Buffer.from(base64, "base64")
    return new Int8Array(buf.buffer, buf.byteOffset, buf.byteLength)
  }
  const binary = atob(base64)
  const u8 = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) u8[i] = binary.charCodeAt(i)
  return new Int8Array(u8.buffer)
}
