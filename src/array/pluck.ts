/** @module array/pluck.ts */

import { untypedCurry } from '../function/untypedCurry'
/**
 * Takes an key (or index) and an array of arrays or objects and returns
 * the selected key from each row
 * @example
 * pluck(1, [ [1,2,3], [4,5,6] ] )
 * //=> [2,5]
 * pluck('a',[ {a:1,b:2}, {a:3,b:4}])
 * // => [1,3]
 */
export function pluck<A, B extends keyof {
  [i in number]: any;
}>( key: B, arr: A[][] ): Array<A | undefined>
export function pluck<A, B extends keyof A>( key: B, arr: A[] ): Array<A[B]>
export function pluck<B extends number>( key: number ): <A>( arr: A[][] ) => Array<A | undefined>
// export function pluck<B extends string,C,D extends Record<B,C>,E extends keyof C>(key: B) :(arr:C[]) => {[H in B ]?: C[E]}[B][]
export function pluck<A extends string, B = [{
  [K in A]?: any;
}]>( keys: A ): ( arr: B ) => B
export function pluck( ...args ) {
  return untypedCurry( ( key, arr ) => arr.map( ( item ) => item[ key ] ) )( ...args )
}

export default pluck
