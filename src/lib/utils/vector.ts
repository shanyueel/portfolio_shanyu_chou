/**
 * Dense float vector maths.
 *
 * Deliberately untyped as to what the vectors mean — these are generic numeric
 * helpers, so they stay usable outside the embedding matcher.
 */

/**
 * Cosine similarity of two unit-length vectors, which reduces to a dot product.
 *
 * Callers MUST pass normalized vectors; the denominator is skipped for speed.
 *
 * @param bOffset - Start index into `b`, so `b` can be one row of a flat
 *   row-major matrix rather than a standalone array.
 */
export function cosine(a: Float32Array, b: Float32Array, bOffset = 0): number {
  let dot = 0
  for (let i = 0; i < a.length; i++) dot += a[i] * b[bOffset + i]
  return dot
}

/** Scale a vector to unit length, in place. An all-zero vector is left alone. */
export function normalize(vector: Float32Array): Float32Array {
  let norm = 0
  for (const v of vector) norm += v * v
  norm = Math.sqrt(norm)
  if (norm > 0) {
    for (let i = 0; i < vector.length; i++) vector[i] /= norm
  }
  return vector
}
