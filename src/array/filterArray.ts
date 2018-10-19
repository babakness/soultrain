/** @module array/filterArray.ts */
import { untypedCurry } from '../function'
import { Predicate } from '../helper-types'

const _filterArray = <A>( fn: Predicate<A>, arr: A[] ): A[] => arr

export function filterArray<A>( fn: Predicate<A>, arr: A[] ): A[]
export function filterArray<A>( fn: Predicate<A> ): ( arr: A[] ) => A[]
export function filterArray<A>( ...args ) {
  return untypedCurry( _filterArray )( ...args )
}
