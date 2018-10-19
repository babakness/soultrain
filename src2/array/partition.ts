/** @module array/partition.ts */


import { untypedCurry } from '../function'
import { Predicate } from '../helper-types'
import { pushArray } from './pushArray'

/**
 * Partitions an array given a predicate.
 * True places item on the head of the array.
 * False in the end
 * @param fn Predicate determining partition of array
 * @param arr Array to partitoin
 * @sig (a -> bool) -> a[] -> [a[],a[]]
 * @example
 * parition( i => i % 2, [1,2,3,4])
 */
export function partition<A>( fn: Predicate<A>, arr: A[] ): [A[], A[]]
export function partition<A>( fn: Predicate<A> ): ( arr: A[] ) => [A[], A[]]
export function partition( ...args ) {
  return untypedCurry(
    ( fn, arr ) => arr.reduce(
      ( [ left, right ], item ) => fn( item )
        ? [ pushArray( left, item ), right ]
        : [ pushArray( right, item ) ], [ [], [] ],
    ),
  )
}

export default partition
