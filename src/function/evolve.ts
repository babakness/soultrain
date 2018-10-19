/** @module function/evolve.ts */

import { Evolve, EvolveRecursive } from '../evolve-type'
import { untypedCurry } from './untypedCurry'
const _evolve = ( fno: {}, dao: {} ) => Object.entries( dao ).reduce( ( acc, [ key, val ] ) => type( fno[ key ] ) !== 'Function'
  ? type( fno[ key ] ) === 'Object' && type( val ) === 'Object'
    ? assoc( acc, key, evolve( fno[ key ], val ) )
    : assoc( acc, key, val )
  : shouldCopy( type( val ) )
    ? assoc( acc, key, evolve( fno[ key ], val ) )
    : assoc( acc, key, fno[ key ]( val ) ), {} )
export function evolve<E extends AnyObject, I extends AnyObject>( evolver: E, incoming: I ): EvolveRecursive<E, I>
export function evolve<E extends AnyObject>( evolver: E ): <I extends AnyObject>( incoming: I ) => EvolveRecursive<E, I>
export function evolve( ...args ) {
  return untypedCurry( _evolve )( ...args )
}
