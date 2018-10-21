import { untypedCurry } from '../function'
import { ValueAt } from '../helper-types'

export function indexValue<A extends any[], I extends number>( index: I, arr: A ): ValueAt<A, I>
export function indexValue<I extends number>( index: I ): <A extends any[]>( arr: A ) => ValueAt<A, I>
export function indexValue( ...args ) {
  return untypedCurry( ( index, arr ) => arr[ index ] )( ...args )
}
