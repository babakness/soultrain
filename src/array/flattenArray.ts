/** @module array/flattenArray.ts */

import { BasicTypes, DeepFlattenNoInfinite, FlattenType } from '../helper-types'

function flattenArray<A extends BasicTypes, B extends [A, ...A[]], C extends [B, ...B[]], D extends [C, ...C[]], E extends [D, ...D[]], F extends [E, ...E[]], G extends [F, ...F[]], H extends [G, ...G[]], I extends [H, ...H[]], J extends [I, ...I[]], K extends [J, ...J[]], L extends [K, ...K[]], M extends [L, ...L[]], N extends [M, ...M[]], O extends [N, ...N[]], P extends [O, ...O[]], Q extends [P, ...P[]], Narrow extends [( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P ), ...Array<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P>]>( arr: Narrow ): DeepFlattenNoInfinite<Narrow>
function flattenArray<A extends [any, ...any[]]>( arr: A ): DeepFlattenNoInfinite<A>
function flattenArray<A extends Array<unknown>>( arr: A ): Array<FlattenType<A>>
/**
 * Flattens an array completely. Handles tuples, maintains literal types.
 *
 * @param arr Array to flatten
 * @esig a[][] -> a[]
 * @example
 * flattenArray( [ [ [1], 2 ], [ 3, [4] ]] )
 * //=> [ 1, 2, 3, 4 ] : [ 1 , 2 ,3, 4 ]
 */
function flattenArray( arr ) {
  return arr.reduce( ( acc, item ) => Array.isArray( item )
    ? acc.concat( flattenArray( item ) )
    : acc.concat( item ), [] )
}

export default flattenArray
