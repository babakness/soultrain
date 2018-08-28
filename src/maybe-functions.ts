import { nothing, Maybe, Just } from './maybe'
import { head, tail, last, init } from './array'
import { prop } from './object'
import { isNullyOrNaN, isNullable } from './check'
import { untypedCurry } from './function'

export const safeInit = <A>(as: Array<A>): Maybe<A[]> => {
  return isNullable(as) ? nothing : Maybe.from(init(as) ) 
}

export const safeHead = <A>(as: Array<A>): Maybe<A> => {
  return isNullable(as) ? nothing : Maybe.from(head(as))
}

export const safeLast = <A>(as: Array<A>): Maybe<A> => {
  return isNullable(as) ? nothing : Maybe.from( last(as) )
}

export const safeTail = <A>(xs: A[]): Maybe< A[] > => {
  return isNullable(xs) ? nothing : Maybe.from(tail(xs))
}

const _safeProp = untypedCurry((str,obj) => {
  const result = prop( str )( obj )
  return isNullyOrNaN(result) ? nothing : Just.of(result)
})

type PossibleKeyValue<A,O> = A extends keyof O ? keyof O[A] : {}

/**
 * takes an key (or index) and an array or object and returns 
 * a Maybe. A Just containing the value of that object at key
 * or a Nothing if there is no value at the key index.
 */
export function safeProp<O,A>(k: A, obj: O): Maybe<PossibleKeyValue<A,O>>
export function safeProp<O,A>(k: A) : (obj: O) => Maybe<PossibleKeyValue<A,O>>
export function safeProp(...args){
  return _safeProp(...args)
}


/**
  * takes an index and an array and returns a maybe containing
  * the value at array's index (or nothing)
  * @example
  * safeIndex(2,[1,2,3]) // Just(3)
  * safeIndex(10,[1,2,3]) // nothing
 */
const _safeIndex = untypedCurry((index,arr) => Maybe.from(arr[index]))
export function safeIndex<A,B extends keyof A>(index: B & number, arr: A & {}[]) : Maybe<A[B]>
export function safeIndex<A,B extends keyof A>(index: B | number) : (arr: A) => Maybe<A[B]>
export function safeIndex(...args){
  return _safeIndex(...args)
}
