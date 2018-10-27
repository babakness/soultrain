/** @module iterable/toStringReverse.ts */

import { joinArray } from '../array/joinArray'
import { reverse } from '../array/reverse'
import { toArray } from '../array/toArray'
import { pipeline } from '../function/pipeline'
/**
 * Takes any iterable and returns the reverse joined
 * :: Iter -> str
 */
export const toStringReverse = <A extends string>( iter: Iterable<A> ) => pipeline( iter, toArray, reverse, joinArray( '' ) )
