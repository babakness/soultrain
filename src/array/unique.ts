/** @module array/unique.ts */

import { BasicTypes, Literal, Unique } from '../helper-types'
import { appendUnique } from './appendUnique'
export function unique<_A extends BasicTypes, A extends Literal<_A>>( arr: A ): Unique<A>
export function unique<A extends any[]>( arr: A ): A
/**
 * Get a copy of the array without duplicates. Attempts to use literal types.
 * @param arr Array to remove duplicates from
 * @sig a[] -> a[]
 * @example
 * unique([1,2,[3],4,4,4,[3]])
 * //=> [1,2,[3],4] : [1,2,[3],4]
 */
export function unique( arr ) {
  return arr.reduce( ( acc, item ) => appendUnique( acc, item ), [] )
}

export default unique
