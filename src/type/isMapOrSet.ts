/** @module type/isMapOrSet.ts */

import {type} from './type'

export const isMapOrSet = ( obj: unknown ): obj is ( Set<any>|Map<any, any> ) => !![ 'Map', 'Set' ].find( ( i ) => i === type( obj ) )
export default isMapOrSet
