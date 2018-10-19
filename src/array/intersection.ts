/** @module array/intersection.ts */

import { complement, pipe, untypedCurry } from '../function'
import { filter } from '../functor-helpers'
import { FlattenOnce} from '../helper-types'
import { contains } from './contains'
import unique from './unique'

const uniqueContains = pipe( unique, contains )

export function intersection< A extends any[], B extends any[]>( first: A, second: B ): Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function intersection< A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function intersection< A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function intersection( ...args ) {
  return untypedCurry(
      ( first, second ) => filter(
        uniqueContains( first ) ,
        unique( second ),
      ),
    )( ...args )
}

export function difference< A extends any[], B extends any[]>( first: A, second: B ): Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function difference< A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function difference< A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function difference( ...args ) {
  return untypedCurry(
      ( first, second ) => filter(
        complement( uniqueContains( second ) ) ,
        unique( first ),
      ),
    )( ...args )
}

export function symmetricDifference< A extends any[], B extends any[]>( first: A, second: B ): Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function symmetricDifference< A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function symmetricDifference< A extends any[]>( first: A ): <B extends any[]>( second: B ) => Array<Extract<FlattenOnce<A>, FlattenOnce<B>>>
export function symmetricDifference( ...args ) {
  return untypedCurry(
    ( first, second ) => difference( first, second ).concat( difference( second, first ) ),
  )( ...args )
}
