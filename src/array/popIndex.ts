/** @module array/popIndex.ts */

import { untypedCurry } from '../function/untypedCurry'
import { ValueAt } from '../helper-types'
export function popIndex<A, I extends number>( index: I, arr: A[] ): [A, A[]]
// export function popIndex<A extends any[], I extends keyof A>( index: I, arr: A ): [ValueAt<A, I>, A]
// export function popIndex<A extends any[], I extends keyof A>( index: I ): <B extends A>( arr: B ) => [ ValueAt < B, I > , B ]
export function popIndex( index: number ): <A>( arr: A[] ) => [A, A[]]
/**
 * Todo
 */
export function popIndex( ...args ) {
  return untypedCurry( ( index, arr ) => [ arr[ index ], [ ...arr.slice( 0, index ), ...arr.slice( index + 1, arr.length ) ] ] )
}

export default popIndex
