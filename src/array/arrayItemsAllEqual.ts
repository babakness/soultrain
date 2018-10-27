/** @module array/arrayItemsAllEqual.ts */

import { untypedCurry } from '../function/untypedCurry'

export function arrayItemsAllEqual<A>( value: A, arr: A[] ): boolean
export function arrayItemsAllEqual<A>( value: A ): ( arr: A[] ) => boolean
/**
 * Check to see if every item in an array is equal to specific value
 * @param value
 * @param arr
 * @sig a -> a[] -> bool
 * @example
 * arrayItemsAllEqual(1,[1,2,2]) // false
 * arrayItemsAllEqual(1,[1,1,1]) // true
 */
export function arrayItemsAllEqual( ...args ) {
  return untypedCurry(
    ( value, arr ) => {
      for ( const i of arr ) {
        if ( i !== value ) { return false }
      }
      return true
    },
)( ...args )
}

export default arrayItemsAllEqual
