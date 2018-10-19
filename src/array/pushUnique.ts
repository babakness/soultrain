/** @module array/pushUnique.ts */
import { untypedCurry } from '../function'
import { AppendUnique, BasicTypes } from '../helper-types'
interface IPushUnique<Item> {
  <A extends BasicTypes, B extends [A, ...A[]], C extends [B, ...B[]], D extends [C, ...C[]], E extends [D, ...D[]], F extends [E, ...E[]], G extends [F, ...F[]], H extends [G, ...G[]], I extends [H, ...H[]], J extends [I, ...I[]], K extends [J, ...J[]], L extends [K, ...K[]], M extends [L, ...L[]], N extends [M, ...M[]], O extends [N, ...N[]], P extends [O, ...O[]], Q extends [P, ...P[]], Narrow extends [( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P ), ...Array<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P>]>( arr: Narrow ): AppendUnique<Narrow, Item>
  <A>( arr: A[] ): Array<A | Item>
}
/**
 * Push an item to an array if the item isn't already in array. Attempts literal types if possible.
 * @param item Item to append if not already in array
 * @param arr Array to append to
 * @sig a -> a[] -> a[]
 * @example
 * pushUnique([4],[1,2,3,[4]])
 * //=> [1,2,3,[4]] : [1,2,3,[4]]
 */
export function pushUnique<_A extends BasicTypes, _B extends [_A, ..._A[]], _C extends [_B, ..._B[]], _D extends [_C, ..._C[]], _E extends [_D, ..._D[]], _F extends [_E, ..._E[]], _Narrow extends [( _A | _B | _C | _D | _E | _F ), ...Array<_A | _B | _C | _D | _E | _F>], A extends BasicTypes, B extends [A, ...A[]], C extends [B, ...B[]], D extends [C, ...C[]], E extends [D, ...D[]], F extends [E, ...E[]], G extends [F, ...F[]], H extends [G, ...G[]], I extends [H, ...H[]], J extends [I, ...I[]], K extends [J, ...J[]], L extends [K, ...K[]], M extends [L, ...L[]], N extends [M, ...M[]], O extends [N, ...N[]], P extends [O, ...O[]], Q extends [P, ...P[]], Narrow extends [( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P ), ...Array<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P>]>( item: _Narrow, arr: Narrow ): AppendUnique<Narrow, _Narrow>
export function pushUnique<Item extends BasicTypes, A extends BasicTypes, B extends [A, ...A[]], C extends [B, ...B[]], D extends [C, ...C[]], E extends [D, ...D[]], F extends [E, ...E[]], G extends [F, ...F[]], H extends [G, ...G[]], I extends [H, ...H[]], J extends [I, ...I[]], K extends [J, ...J[]], L extends [K, ...K[]], M extends [L, ...L[]], N extends [M, ...M[]], O extends [N, ...N[]], P extends [O, ...O[]], Q extends [P, ...P[]], Narrow extends [( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P ), ...Array<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P>]>( item: Item, arr: Narrow ): AppendUnique<Narrow, Item>
export function pushUnique<_A extends BasicTypes, _B extends [_A, ..._A[]], _C extends [_B, ..._B[]], _D extends [_C, ..._C[]], _E extends [_D, ..._D[]], _F extends [_E, ..._E[]], _Narrow extends [( _A | _B | _C | _D | _E | _F ), ...Array<_A | _B | _C | _D | _E | _F>]>( item: _Narrow ): <A extends BasicTypes, B extends [A, ...A[]], C extends [B, ...B[]], D extends [C, ...C[]], E extends [D, ...D[]], F extends [E, ...E[]], G extends [F, ...F[]], H extends [G, ...G[]], I extends [H, ...H[]], J extends [I, ...I[]], K extends [J, ...J[]], L extends [K, ...K[]], M extends [L, ...L[]], N extends [M, ...M[]], O extends [N, ...N[]], P extends [O, ...O[]], Q extends [P, ...P[]], Narrow extends [( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P ), ...Array<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P>]>( arr: Narrow ) => AppendUnique<Narrow, _Narrow>
export function pushUnique<Item extends BasicTypes>( item: Item ): IPushUnique<Item>
export function pushUnique( ...args ) {
  return untypedCurry( ( arr, item ) => arr.indexOf( item ) < 0 ? arr : arr.concat( [ item ] ) )( ...args )
}

export default pushUnique
