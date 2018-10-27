/** @module logging.ts */

import { K, S } from './combinators'
import { untypedCurry } from './function/untypedCurry'
import { pluckObj } from './object'

/* tslint:disable no-console */

// derived helpers
/**
 * Todo
 */
export const tap = S( K )
// tslint:disable-next-line:no-console
/**
 * Todo
 */
export const trace = <A>( a: A ): A => ( console.log( a ), a )
const messageSymbol = Symbol

interface Message { value: any; id: typeof messageSymbol}

/**
 * Todo
 */
export const label =
  // tslint:disable-next-line:no-shadowed-variable
  function label( value ): Message {
    return { value, id: messageSymbol }
  }

const _last = ( arr ) => arr[ arr.length - 1 ]
// export declare function log(a?: { value: any; id: typeof messageSymbol},b) : any
// export function log<A,B>(a: A , b: B ) : B
/**
 * Todo
 */
export function log<A, B>( a: A | Message, ...args: B[] ): A extends Message
  ? <C>( b: C ) => C
  : B extends never
    ? A
    : Array<A|B>

/**
 * Todo
 */
export function log( a, ...args ) {
  const {id, value} = a as any
  return args.length
    ? ( console.log( a, ...args ), [].concat( a ).concat( args as any ) )
    : id === messageSymbol
      ? ( _a ) => ( console.log( value, _a ), _a )
      : ( console.log( a ), a ) as any
}

// export declare function log<B,C>(b: B,c?:C) : B

// export declare function log<A>(a:A) : A
// export declare function log<A,B>(a:A,b:B) : B

/**
 * Todo
 */
export const traceMultiLabels = <A>( ...args ) => ( a: A ): A => ( console.log( ...args, a ), a )
export const _traceWithLabel = untypedCurry( ( _label, a ) => ( console.log( _label, a ), a ) )

export function traceWithLabel<A>( label: {} ): ( a: A ) => A
/**
 * Todo
 */
export function traceWithLabel<A>( label: {} , a: A ): A
/**
 * Todo
 */
export function traceWithLabel( ...args ) {
  return _traceWithLabel( ...args )
}
export const traceDebugger = ( ...args ) => args
/**
 * Todo
 */
export const note = ( ...messages ) => ( console.log( ...messages ), log )

// export const map = fn => list => list.map( fn )
/**
 * Todo
 */
export const debug = ( name: string, ...pluckTheseOffData: string[] ) => ( data: {} ) => {
  console.log(
    name,
    pluckTheseOffData.length
      ? pluckObj( ...pluckTheseOffData )( data )
      : data )
  return data
}
