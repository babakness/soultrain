import { S, K } from './combinators'
import { untypedCurry } from './function'
import { pluckObj } from './object'

// derived helpers
export const tap = S( K )
export const trace = <A>(a:A): A => ( console.log( a ), a )
export const traceMultiLabels = <A>(...args ) => (a: A): A => ( console.log(...args, a ), a )
export const _traceWithLabel = untypedCurry(( label, a) => ( console.log( label, a ), a ))

export function traceWithLabel<A>( label: {} ) :  (a: A) => A
export function traceWithLabel<A>( label: {} , a: A) : A
export function traceWithLabel(...args) {
  return _traceWithLabel(...args)
}
export const traceDebugger = ( ...args ) => { return args }
export const log = trace
export const note = ( ...messages ) => ( console.log( ...messages ), log ) 

// export const map = fn => list => list.map( fn )

export const debug = ( name: string, ...pluckTheseOffData: string[] ) => ( data: {}) => {
  console.log(
    name,
    pluckTheseOffData.length
      ? pluckObj( ...pluckTheseOffData )( data )
      : data )
  return data
}