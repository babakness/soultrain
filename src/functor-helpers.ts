/** @module functor-helpers.ts */
import { HKT, Type, URIS } from 'fp-ts/lib/HKT'
import { pushArray } from './array/pushArray'
import { unshiftArray } from './array/unshiftArray'
import { untypedCurry } from './function/untypedCurry'
import { Append, Concat, Concattable, Filterable, Function1, Functor, Predicate, Prepend, Pushable, ValueOf } from './helper-types'

interface ConcatCurried<A extends [any, ...any[]]> {
  <B extends [any, ...any[]]>( item: B ): Concat < A, B >
  <B extends any>( item: B ): B extends any[] ? Array< ValueOf<A> | ValueOf<B>> : Concat < A, [B] >
  <B extends any[]>( item: B ): Array < ValueOf<A> | ValueOf < B >>
}

/**
 * Calls `concat` on an array or a concattable. Also typed to work well with tuples.
 *
 * @param arr
 * @param item
 */
export function concat<A extends [any, ...any[]], B extends [any, ...any[]]>( acc: A, item: B ): Concat<A, B>
export function concat<A extends [any, ...any[]]>( acc: A ): ConcatCurried<A>
export function concat<A extends [any, ...any[]], B extends any>( acc: A, item: B ): B extends any[] ? Array< ValueOf<A> | ValueOf<B>> : Concat<A, [B]>
export function concat<A extends [any, ...any[]]>( acc: A ): ConcatCurried<A>
export function concat<A extends [any, ...any[]], B extends any[]>( acc: A, item: B ): Array< ValueOf<A> | ValueOf<B>>
export function concat<A extends [any, ...any[]]>( acc: A ): ConcatCurried<A>
export function concat<A extends any[], B extends any[]>( acc: A, item: B ): Array< ValueOf<A> | ValueOf<B>>
export function concat<A extends any[], B extends any[]>( acc: A ): ( item: B ) => Array< ValueOf<A> | ValueOf<B>>
export function concat<A>( acc: ConcatArray<A> , item: A ): ConcatArray<A>
export function concat<A>( acc: ConcatArray<A> ): ( item: A ) => ConcatArray<A>
export function concat<A>( acc: Concattable<A> , item: A ): Concattable<A>
export function concat<A>( acc: Concattable<A> ): ( item: A ) => Concattable<A>
export function concat<A >( arr: A[], item: A ): A[]
export function concat<A >( arr: A[] ): ( item: A )  => A[]
export function concat<A extends Array<{}>, B extends any >( arr: A ): ( item: B ) => Array<A & B>
export function concat<A>( ...args ) {
  return untypedCurry( ( a, b ) => a.concat( b ) )( ...args )
}

/**
 * Flips the order of parameters of `concat` which calls `concat`
 * on an array or a concattable. Also typed to work well with tuples.
 * @param item
 * @param arr
 */
export function flipConcat<A extends [any, ...any[]], B extends [any, ...any[]]>( item: A, acc: B ): Concat<B, A>
export function flipConcat<A extends [any, ...any[]]>( item: A ): <B extends [any, ...any[]]>( acc: B ) => Concat<B, A>
export function flipConcat<A extends any, B extends [any, ...any[]]>( item: A, acc: B ): A extends any[] ? Array< ValueOf<A> | ValueOf<B>> : Concat<B, [A]>
export function flipConcat<A extends any>( item: A ): <B extends [any, ...any[]]>( acc: B ) => A extends any[] ? Array< ValueOf<A> | ValueOf<B>> : Concat<B, [A]>
export function flipConcat<A extends any[], B extends [any, ...any[]]>( item: A, acc: B ): Array< ValueOf<A> | ValueOf<B>>
export function flipConcat<A extends any[]>( item: A ): <B extends [any, ...any[]]>( acc: B ) => Array< ValueOf<A> | ValueOf<B>>
export function flipConcat<A>( item: A, acc: ConcatArray<A> ): ConcatArray<A>
export function flipConcat<A>( item: A ): ( acc: ConcatArray<A> ) => ConcatArray<A>
export function flipConcat<A>( item: A, acc: Concattable<A> ): Concattable<A>
export function flipConcat<A>( item: A ): ( acc: Concattable<A> ) => Concattable<A>
export function flipConcat<A >( item: A , arr: A[] ): A[]
export function flipConcat<A >( item: A ): ( arr: A[] )  => A[]
export function flipConcat<A extends Array<{}>, B extends any >( item: B ): ( arr: A ) => Array<A & B>
export function flipConcat<A>( ...args ) {
  return untypedCurry( ( a , b ) => b.concat( a ) )( ...args )
}

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    'Array': A[],
  }
}

export function push<A extends [any, ...any[]], B>( acc: A, item: B ): Append<A, B>
export function push<A extends [any, ...any[]]>( acc: A ): <B>( item: B ) => Append<A, B>
export function push<A extends any[], B>( acc: A, item: B ): Array<ValueOf<A>|B>
export function push<A extends any[]>( acc: A ): <B>( item: B ) => Array<ValueOf<A>|B>
export function push<A>( acc: Pushable<A>, item: A ): Pushable < A >
export function push<A>( acc: Pushable<A> ): ( item: A ) => Pushable < A >
export function push<A>( ...args ) {
  return untypedCurry(
    ( acc, item ) => Array.isArray( acc )
      ? pushArray( acc, item )
      : acc.push( item ),
  )( ...args )
}

export function unshift<A extends [any, ...any[]], B>( acc: A, item: B ): Prepend<A, B>
export function unshift<A extends [any, ...any[]]>( acc: A ): <B>( item: B ) => Prepend<A, B>
export function unshift<A extends any[], B>( acc: A, item: B ): Array<ValueOf<A>|B>
export function unshift<A extends any[]>( acc: A ): <B>( item: B ) => Array<ValueOf<A>|B>
export function unshift<A>( ...args ) {
  return untypedCurry(
    ( acc, item ) => Array.isArray( acc )
      ? unshiftArray( acc, item )
      : acc.unshift( item ),
  )( ...args )
}

interface IPrepend<B> {
  <A extends [any, ...any[]]>( acc: A ): Prepend<A, B>
  <A extends any[]>( acc: A ): Array<ValueOf<A>|B>
}

export function prepend<B, A extends [any, ...any[]]>( item: B, acc: A ): Prepend<A, B>
export function prepend<B, A extends any[] >( item: B, acc: A ): Array<ValueOf<A>|B>
export function prepend<B>( item: B ): IPrepend<B>
export function prepend( ...args ) {
  return untypedCurry(
    ( item, acc ) => acc.concat( [ item ] ),
  )( ...args )
}

/**
 * Takes a function and a filterable and returns said filterable after transformation
 * (a -> bool) -> c a -> c a
 */
export function filter<A, F extends any[]>( fn: Predicate<A>, functor: F ): F
export function filter<A>( fn: Predicate<A> ): <F extends any[]>( functor: F ) => F
// export function filter<A, F extends URIS>( fn: Predicate<A>, functor: HKT<F, A> & Filterable<A> ): Type<F, A>
// export function filter<A, F extends URIS>( fn: Predicate<A> ): ( functor: HKT<F, A> & Filterable<A> )  => Type<F, A>
export function filter( ...args ) {
  return untypedCurry( ( fn, filterable ) => filterable.filter( fn ) )( ...args )
}

/**
 * Takes a function and a functor and lifts function over values in functor
 * (a -> b) -> f a -> f b
 */
export function map<A, B, F extends URIS>( fn: Function1<A, B>, functor: HKT<F, A> & Functor<A> ): Type<F, B>
export function map<A, B, F extends URIS>( fn: Function1<A, B> ): ( functor: HKT<F, A> & Functor<A> )  => Type<F, B>
export function map( ...args ) {
  return untypedCurry( ( fn, functor ) => functor.map( fn ) )( ...args )
}

interface Reduce<A, V, F> {
  ( initial: V ): ( functor: ( HKT<F, A> & Functor<A> ) | A[] ) => V
  ( initial: V , functor: ( HKT<F, A> & Functor<A> ) | A[] ): V
}
export function reduce<A, V, F extends URIS>( fn: ( acc: V, item: A ) => V, initial: V, functor: ( HKT<F, A> & Functor<A> ) | A[] ): V
export function reduce<A, V, F extends URIS>( fn: ( acc: V, item: A ) => V, initial: V ): ( functor: ( HKT<F, A> & Functor<A> ) | A[] ) => V
export function reduce<A, V, F extends URIS>( fn: ( acc: V, item: A ) => V ): Reduce< A, V, F >
export function reduce( ...args ) {
  return untypedCurry(
    ( fn, initial, functor ) => functor.reduce( fn, initial ),
  )( ...args )
}
interface Fold<A, V, F> {
  ( fn: ( acc: V, item: A ) => V ): ( functor: ( HKT<F, A> & Functor<A> ) | A[] ) => V
  ( fn: ( acc: V, item: A ) => V, functor: ( HKT<F, A> & Functor<A> ) | A[] ): V
}

export function fold<A, V, F extends URIS>( initial: V, fn: ( acc: V, item: A ) => V, functor: ( HKT<F, A> & Functor<A> ) | A[] ): V
export function fold<A, V, F extends URIS>( initial: V, fn: ( acc: V, item: A ) => V ): ( functor: ( HKT<F, A> & Functor<A> ) | A[] ) => V
export function fold<A, V, F extends URIS>( initial: V ): Fold< A, V, F >
export function fold( ...args ) {
  return untypedCurry(
    ( fn, initial, functor ) => Array.isArray( functor )
      ? functor.reduce( fn, initial )
      : functor.fold( initial, fn ),
  )( ...args )
}
