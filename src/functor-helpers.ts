import { HKT, Type, URIS, } from 'fp-ts/lib/HKT'
import {Concattable, Pushable, Predicate, Filterable, Function1, Functor } from './helper-types'
import { untypedCurry } from './function'
export function concat<A>( acc: A[] ): (a: (A | A[])) => A[]
export function concat<A>( acc: Concattable<A> ): (item: A) => Concattable<A>
export function concat<A>( acc ){
  return item => acc.concat(item)
}


declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    'Array': Array<A>,
  }
}


export function push<A>( acc: A[] ): ( a: A ) => A
export function push<A>( acc: Pushable<A> ): ( item: A ) => Pushable<A>
export function push<A>( acc ){
  return ( item ) => ( acc.push( item ), acc )
}



const _filter = untypedCurry((fn, filterable) => filterable.filter(fn) )

/**
 * Takes a function and a filterable and returns said filterable after transformation
 * (a -> bool) -> c a -> c a
 */
export function filter<A, F extends URIS>(fn: Predicate<A>, functor:HKT<F,A> & Filterable<A>) : Type<F,A>
export function filter<A, F extends URIS>(fn: Predicate<A>) : (functor:HKT<F,A> & Filterable<A>)  => Type<F,A>
export function filter(...args) {
  return _filter(...args)
}











// const isMaybe = <A>( obj : Maybe<A> | any ): obj is Maybe<A>  => {
//   return ( obj instanceof Just )
// }

  
// export type IsNestedMaybe<T> = T extends Maybe<Maybe<any>> ? 'T' : 'F'

// export type Flatten<T extends Maybe<any>> = {
//   T: Flatten<T['_A']>
//   F: T
// }[IsNestedMaybe<T>]






/**
 * MAP
 */
const _map = untypedCurry((fn, functor) => functor.map(fn) )

/**
 * Takes a function and a functor and lifts function over values in functor
 * (a -> b) -> f a -> f b
 */
export function map<A,B,F extends URIS>(fn: Function1<A,B>, functor:HKT<F,A> & Functor<A>) : Type<F,B>
export function map<A,B,F extends URIS>(fn: Function1<A,B>) : (functor:HKT<F,A> & Functor<A>)  => Type<F,B>
export function map(...args) {
  return _map(...args)
}
