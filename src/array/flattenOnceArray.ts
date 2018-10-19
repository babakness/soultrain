/** @module array/flattenOnceArray.ts */
import { BasicTypes, FlattenArray, FlattenOnce, Omit } from '../helper-types'
/**
 * Flattens an array by one level.
 *
 * @param arr Array to flatten
 * @esig a[][] -> a[]
 * @example
 * flattenOnceArray( [ [ 1, [2] ], [ 3, 4 ]] )
 * // note: literal values retained in type info
 * //=> [ 1, [2], 3, 4 ] : [ 1, [2], 3, 4]
 */

function flattenOnceArray<A extends BasicTypes, B extends [A, ...A[]], C extends [B, ...B[]], D extends [C, ...C[]], E extends [D, ...D[]], F extends [E, ...E[]], G extends [F, ...F[]], H extends [G, ...G[]], I extends [H, ...H[]], J extends [I, ...I[]], K extends [J, ...J[]], L extends [K, ...K[]], M extends [L, ...L[]], N extends [M, ...M[]], O extends [N, ...N[]], P extends [O, ...O[]], Q extends [P, ...P[]], Narrow extends [( A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P ), ...Array<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P>] >( arr: Narrow ): FlattenOnce<Narrow>
function flattenOnceArray<A extends [any, ...any[]]>( arr: A ): FlattenOnce<A>
function flattenOnceArray<A extends Array<unknown>>( arr: A ): FlattenArray<A>
function flattenOnceArray( arr ) {
  return arr as any
}
export default flattenOnceArray
