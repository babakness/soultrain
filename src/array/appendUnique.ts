/** @module array/appendUnique.ts */

import { untypedCurry } from '../function'
import { AppendUnique as AppendUnique_, BasicTypes } from '../helper-types'
import { indexOf } from '../iterable/indexOf'
import { filterEntryKeys } from '../transducers'

interface IAppendUniqueSecondLayer<N1 extends any[]> {
  <Item extends BasicTypes, A extends BasicTypes, B extends [A, ...A[]], C extends [B, ...B[]], D extends [C, ...C[]], E extends [D, ...D[]], F extends [E, ...E[]], G extends [F, ...F[]], H extends [G, ...G[]], I extends [H, ...H[]], J extends [I, ...I[]], K extends [J, ...J[]], L extends [K, ...K[]], M extends [L, ...L[]], N extends [M, ...M[]], O extends [N, ...N[]], P extends [O, ...O[]], Q extends [P, ...P[]], N2 extends [( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P ), ...Array<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P>]>( item: N2 ): AppendUnique_ < N1, N2 >
  <Item extends BasicTypes>( item: Item ): AppendUnique_ < N1, Item >,
}

interface AppendUnique {
  <_A extends BasicTypes, _B extends [_A, ..._A[]], _C extends [_B, ..._B[]], _D extends [_C, ..._C[]], _E extends [_D, ..._D[]], _F extends [_E, ..._E[]], _Narrow extends [( _A | _B | _C | _D | _E | _F ), ...Array<_A | _B | _C | _D | _E | _F>], A extends BasicTypes, B extends [A, ...A[]], C extends [B, ...B[]], D extends [C, ...C[]], E extends [D, ...D[]], F extends [E, ...E[]], G extends [F, ...F[]], H extends [G, ...G[]], I extends [H, ...H[]], J extends [I, ...I[]], K extends [J, ...J[]], L extends [K, ...K[]], M extends [L, ...L[]], N extends [M, ...M[]], O extends [N, ...N[]], P extends [O, ...O[]], Q extends [P, ...P[]], Narrow extends [( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P ), ...Array<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P>]>( arr: Narrow , item: _Narrow ): AppendUnique_<Narrow, _Narrow>
  <Item extends BasicTypes, A extends BasicTypes, B extends [A, ...A[]], C extends [B, ...B[]], D extends [C, ...C[]], E extends [D, ...D[]], F extends [E, ...E[]], G extends [F, ...F[]], H extends [G, ...G[]], I extends [H, ...H[]], J extends [I, ...I[]], K extends [J, ...J[]], L extends [K, ...K[]], M extends [L, ...L[]], N extends [M, ...M[]], O extends [N, ...N[]], P extends [O, ...O[]], Q extends [P, ...P[]], Narrow extends [( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P ), ...Array<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P>]>( arr: Narrow , item: Item ): AppendUnique_<Narrow, Item>
  <A extends BasicTypes, B extends [A, ...A[]], C extends [B, ...B[]], D extends [C, ...C[]], E extends [D, ...D[]], F extends [E, ...E[]], G extends [F, ...F[]], H extends [G, ...G[]], I extends [H, ...H[]], J extends [I, ...I[]], K extends [J, ...J[]], L extends [K, ...K[]], M extends [L, ...L[]], N extends [M, ...M[]], O extends [N, ...N[]], P extends [O, ...O[]], Q extends [P, ...P[]], Narrow extends [( A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P ), ...Array<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P>]>( arr: Narrow ): IAppendUniqueSecondLayer<Narrow>
  <A, B>( arr: A[], item: B ): Array<A|B>
  <A, B>( arr: A[] ): ( item: B ) => Array<A|B>
}

/**
 * Appends an item to an array if the item isn't already in array. Attempts literal types if possible.
 * @param arr Array to append to
 * @param item Item to append if not already in array
 * @sig a[] -> a -> a[]
 * @example
 * appendUnique([1,2,3,[4]], [4])
 * //=> [1,2,3,[4]] : [1,2,3,[4]]
 */
export const appendUnique: AppendUnique = ( ...args ) => {
  return untypedCurry(
    ( arr, item ) => indexOf( item, arr ) < 0 ? arr.concat( item ) : arr,
      // arr.indexOf( item ) < 0 ? arr : arr.concat( [ item ] ),
  )( ...args )
}

export default appendUnique
