/** @module flow.ts */

import { complement } from './function/complement'
import { curry } from './function/curry'
import { untypedCurry } from './function/untypedCurry'
import { Function1, Function2, FunctionV, Predicate } from './helper-types'
import { trace } from './logging'
import { Maybe } from './maybe'

export function when<A, B>( pred: Function1<A, boolean>, whenTrueFn: Function1<A, B>, input: A ): A | B
export function when<A, B>( pred: Function1<A, boolean>, whenTrueFn: Function1<A, B> ): ( input: A ) =>  A | B
export function when<A>( pred: Function1<A, boolean> ): <A2 extends A, B>( whenTrueFn: Function1<A2, B> ) => ( input: A2 ) =>  A2|B
/**
 * Takes a predicate, a function, and a value. If pred(a) is true then will run function over value otherwise returns value.
 * :: pred -> fn -> x -> x | fn(x)
 */
export function when( ...args ) {
  return untypedCurry( ( pred, whenTrueFn, x ) => pred( x ) === true ? whenTrueFn( x ) : x )( ...args )
}

export function times <A>( callback: Function1<number, A>, repeat: number ): A[]
export function times <A>( callback: Function1<number, A> ): ( repeat: number ) => A[]
/**
 * Takes a callback and a repeat number n, iterates over that function n times.
 * :: ( fn -> n -> a ) -> n -> a[]
 */
export function times( ...args ) {
  return untypedCurry( ( callback, numberOfTimes ) => {
    const returnValues: any[] = []
    for ( let index = 0; index < numberOfTimes; index++ ) {
      returnValues.push( callback( index ) )
    }
    return returnValues
  } )( ...args )
}

export function times_<A>( repeat: number, callback: Function1<number, A> ): A[]
export function times_( repeat: number ): <A>( callback: Function1<number, A> ) => A[ ]
/**
 * Takes a callback and a repeat number n, iterates over that function n times.
 * :: ( fn -> n -> a ) -> n -> a[]
 */
export function times_( ...args ) {
  return untypedCurry( ( numberOfTimes, callback ) => {
    const returnValues: any[] = []
    for ( let index = 0; index < numberOfTimes; index++ ) {
      returnValues.push( callback( index ) )
    }
    return returnValues
  } )( ...args )
}

export function timesWithRepeat <A>( callback: Function2<number, number, A>, repeat: number ): A[]
export function timesWithRepeat<A>( callback: Function2<number, number, A> ): ( repeat: number ) => A[]
/**
 * Takes a callback and a repeat number n, iterates over that function n times.
 * :: ( fn -> n -> nt -> a ) -> nt -> a[]
 */
export function timesWithRepeat( ...args ) {
  return untypedCurry( ( callback, numberOfTimes ) => {
    const returnValues: any[] = []
    for ( let index = 0; index < numberOfTimes; index++ ) {
      returnValues.push( callback( index, numberOfTimes ) )
    }
    return returnValues
  } )( ...args )
}

export function timesWithRepeat_<A>( repeat: number, callback: Function2<number, number, A> ): A[]
export function timesWithRepeat_( repeat: number ): <A>( callback: Function2<number, number, A> ) => A[]
/**
 * Takes a callback and a repeat number n, iterates over that function n times.
 * :: ( fn -> n -> nt -> a ) -> nt -> a[]
 */
export function timesWithRepeat_( ...args ) {
  return untypedCurry( ( numberOfTimes, callback ) => {
    const returnValues: any[] = []
    for ( let index = 0; index < numberOfTimes; index++ ) {
      returnValues.push( callback( index, numberOfTimes ) )
    }
    return returnValues
  } )( ...args )
}

/**
 * Alias to for `times`
 * :: ( fn -> a ) -> n -> a[]
 */
export const loop = times

export function tryCatch <A>( failCallback: Function1<Error, A>, testCallback: FunctionV<( null|undefined ), A> ): A
export function tryCatch <A>( failCallback: Function1<Error, A> ): ( testCallback: FunctionV<( null|undefined ), A> ) => A
/**
 * Takes failure callback f and test function t, runs t or f if t failes.
 * :: ( f -> e -> a ) -> ( f -> a) -> a
 */
export function tryCatch( ...args ) {
  return untypedCurry( ( failCallback, testCallback ) => {
    try {
      return testCallback()
    } catch ( e ) {
      return failCallback( e )
    }
  } )
}

export function tryCatchWithParams <A, B, C>( failCallback: Function1<Error, A>, testCallback: FunctionV<B, A> ): ( ...args: B[] ) => A
export function tryCatchWithParams <A, B>( failCallback: Function1<Error, A> ): ( testCallback: FunctionV<B, A> ) => ( ...args: B[] ) => A
/**
 * Like tryCatch only test function receives arguments in a seperate callback
 * :: ( f -> e -> a ) -> ( f -> a) -> a
 */
export function tryCatchWithParams( failCallback, testCallback? ) {
  const doIt = ( _testCallback ) => ( ...args ) => {
    try {
      return _testCallback( ...args )
    } catch ( e ) {
      return failCallback( e )
    }
  }
  if ( !testCallback ) {
    return doIt
  } else {
    return doIt( testCallback )
  }
}

/**
 *  Takes a value v, a glob of predicates, and a test a parameter "a", returns true if any predicate given "a" matches "v"
 * :: v -> ...((a) -> bool) -> a -> bool
 */
export const logical = ( value: boolean ) => <A>( ...fns: Array<Predicate<A>> ) => ( x: A ) => {
  for ( const fn of fns ) {
    if ( fn( x ) === value ) {
      return true
    }
  }
  return false
}

/**
 *  Takes a glob of predicates "p" taking a value "a", then a value "a" and returns true if any of "p" given "a" is true
 * :: v -> ...((a) -> bool) -> a -> bool
 */
export const either = logical( true )

/**
 *  Takes a glob of predicates "p" taking a value "a", then a value "a" and returns true if all of "p" given "a" is true
 * :: v -> ...((a) -> bool) -> a -> bool
 */
export const and = <A>( ...fns: Array<Predicate<A>> ) => complement( logical( true )<A>( ...fns ) )
/* 900 */

/**
 * ifElse
 */
const _ifElse = untypedCurry(
  ( predicate, trueCondition, falseCondition, input ) => predicate( input ) ? trueCondition( input ) : falseCondition( input ),
)
export function ifElse<A, B>( p: Function1<A, boolean>, t: Function1<A, B>, f: Function1<A, B>, i: A ): B
export function ifElse<A, B>( p: Function1<A, boolean>, t: Function1<A, B>, f: Function1<A, B> ): ( i: A ) => B
export function ifElse<A>( p: Function1<A, boolean> ): <A2 extends A, B>( t: Function1<A2, B> ) => <A3 extends A2, B2 extends B>( f: Function1<A3, B2> ) => ( i: A3 ) => B2
/**
 * Functional If/Else branching
 * Given predicate(input), execute trueCondition(input) or falseCondition(input).
 *
 * @example
 *
 * // remove lines starting with comments
 * ifElse( test( /^\#/ ) , _ => '' , identity )
 *
 * :: predicate ( input A -> boolean ) ->
 *      trueCondition ( input A -> output1 B) ->
 *      falseCondition ( input A -> output2 B)->
 *      input ->
 *        output B
 */
export function ifElse( ...args ) {
  return _ifElse( ...args )
}

export function gt( a: number ): ( b: number ) => boolean
export function gt( a: number, b: number ): boolean
/**
 * Predicate, right associative greater-than. Check that the second parameter is greater-than the first
 * @param a number which `b` must be greater-than
 * @param b number which is checked to be greater-than `a`
 * @example
 * pipeline(
 *   10,
 *   gt(11)
 * ) // false
 */
export function gt( ...args ) {
  return untypedCurry( ( a, b ) => b > a )( ...args )
}

export function gte( a: number ): ( b: number ) => boolean
export function gte( a: number, b: number ): boolean
/**
 * Predicate, right associative greater-than or equal to. Check that the second parameter is greater-than or equal to the first
 * @param a number which `b` must be greater than
 * @param b number which is checked to be greater than `a`
 * @example
 * pipeline(
 *   10,
 *   gt(11)
 * ) // false
 */
export function gte( ...args ) {
  return untypedCurry( ( a, b ) => b >= a )( ...args )
}

export function lt( a: number ): ( b: number ) => boolean
export function lt( a: number, b: number ): boolean
/**
 * Predicate, right associative less-than. Check that the second parameter is less-than the first
 * @param a number which `b` must be less-than
 * @param b number which is checked to be less-than `a`
 * @example
 * pipeline(
 *   10,
 *   gt(11)
 * ) // false
 */
export function lt( ...args ) {
  return untypedCurry( ( a, b ) => b < a )( ...args )
}

export function lte( a: number ): ( b: number ) => boolean
export function lte( a: number, b: number ): boolean
/**
 * Predicate, right associative less-than or equal to. Check that the second parameter is less-than or equal to the first
 * @param a number which `b` must be less-than
 * @param b number which is checked to be less-than `a`
 * @example
 * pipeline(
 *   10,
 *   gt(11)
 * ) // false
 */
export function lte( ...args ) {
  return untypedCurry( ( a, b ) => b <= a )( ...args )
}

export function eq<T>( a: T ): ( b: T ) => boolean
export function eq<T>( a: T, b: T ): boolean
/**
 * Predicate checks that both given values `a` and `b` are the same. Strictly typed
 */
export function eq( ...args ) {
  return untypedCurry( ( a, b ) => b === a )( ...args )
}

export function untypedEq( a: any ): ( b: any ) => boolean
export function untypedEq( a: any, b: any ): boolean
/**
 * Predicate checks that both given values `a` and `b` are the same. Untyped.
 */
export function untypedEq( ...args ) {
  return untypedCurry( ( a, b ) => b === a )( ...args )
}
