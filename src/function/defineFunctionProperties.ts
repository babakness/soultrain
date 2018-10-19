/** @module function/defineFunctionProperties.ts */

import { define } from './define'

// Copied to prevent further depedencies, may not be up to date. For limited use case below.
// tslint:disable-next-line:variable-name
const _entries =  <O, K extends keyof O>( obj: O ): Array<[ K extends never ? string : K, O[K] extends never ? unknown : O[K] ]> => ( Object.entries ? Object.entries( obj ) : Object.keys( obj ).map( ( key ) => [ key, obj[ key ] ] ) ) as Array<[ K extends never ? string : K, O[K] extends never ? unknown : O[K] ]>

export const defineFunctionProperties = <A>( fn: A, obj: object ): A => ( _entries( obj )
  .reduce( ( acc, [ k, v ] ) => ( define( acc, k, { value: v, writable: false, enumerable: false, configurable: true } ), acc ), fn ),
  fn )

export default defineFunctionProperties
