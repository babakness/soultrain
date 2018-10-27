/** @module function/evolve.ts */

import { Evolve, EvolveRecursive } from '../evolve-type'
import { AnyObject } from '../helper-types'
import { label, log, trace } from '../logging'
import { assoc } from '../object'
import { type } from '../type/type'
import { untypedCurry } from './untypedCurry'

// const shouldCopy = ( _type: string ): boolean => {
//   console.log( _type )
//   return true
// }

const _evolve = ( fno: {}, dao: {} ) =>  Object.entries( dao ).reduce( ( acc, [ key, val ] ) => type( fno[ key ] ) !== 'Function'
  ? type( fno[ key ] ) === 'Object' && type( val ) === 'Object'
    ? assoc( acc, key, _evolve( fno[ key ], val ) )
    : assoc( acc, key, val )
  : assoc( acc, key, fno[ key ]( val ) )
  // : shouldCopy( type( val ) )
  //   ? assoc_( acc, key, _evolve( fno[ key ], val ) )
  //   : assoc_( acc, key, fno[ key ]( val ) )
  ,
  {} )

export function evolve<E extends AnyObject, I extends AnyObject>( evolver: E, incoming: I ): Evolve<E, I>
export function evolve<E extends AnyObject>( evolver: E ): <I extends AnyObject>( incoming: I ) => Evolve<E, I>
export function evolve( ...args ) {
  return untypedCurry( _evolve )( ...args )
}

// type bro = EvolveRecursive < {a: ( i ) => i + 1 }, { a: 1 }>
