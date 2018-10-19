/** @module array/every.ts */
import { untypedCurry } from '../function/untypedCurry'
import { Transduce } from '../transduce'
/**
 * Return every n-th item in an array skipping the first number of items given
 * by an offset
 * @sig n1 -> n2 -> a[] -> a[]
 * @param n number of items to step before taking the next item from array
 * @param offset number of items
 * @example
 * every(2,1,[1,2,3,4]) // [2,4]
 */
export function every<A>( n: number, offset: number, arr: A[] ): A[]
export function every( n: number, offset: number ): <A>( arr: A[] ) => A[]
export function every( n: number ): ( offset: number ) => <A>( arr: A[] ) => A[]
export function every( ...args ) {
  return untypedCurry( ( n, offset, arr ) => Transduce.of( arr )
    .every( n, offset )
    .join() )( ...args )
}

export default every
