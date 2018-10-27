/** @module equals.ts */

import { toArray } from './array/toArray'
import { untypedCurry } from './function'

// Borrowed from Ramda with love

const identical = ( a, b ) =>
  a === b
    ? a !== 0 || 1 / a === 1 / b
    :  a !== a && b !== b

const _has = ( prop, obj ) => Object.prototype.hasOwnProperty.call( obj, prop )
const keys = ( obj ) => Object.keys( obj )

function _containsWith( pred, x, list ) {
  let idx = 0
  const len = list.length

  while ( idx < len ) {
    if ( pred( x, list[ idx ] ) ) {
      return true
    }
    idx += 1
  }
  return false

}

function _functionName( f ) {
  if ( Function.prototype.name !== undefined && Function.prototype.name !== null ) {
    return f.name
  }
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  const match = String( f ).match( /^function (\w*)/ )
  return match == null ? '' : match[ 1 ]
}

const objectType = ( val ) => val === null
  ? 'Null'
  : val === undefined
    ? 'Undefined'
    : Object.prototype.toString.call( val )

function _uniqContentEquals( aIterator, bIterator, stackA, stackB ) {
  const a = toArray( aIterator )
  const b = toArray( bIterator )

  function eq( _a, _b ) {
    return _equals( _a, _b, stackA.slice(), stackB.slice() )
  }

  // if *a* array contains any element that is not included in *b*
  // tslint:disable-next-line:no-shadowed-variable only-arrow-functions
  return !_containsWith( function( b, aItem ) {
    return !_containsWith( eq, aItem, b )
  }, b, a )
}

function _equals( a, b, stackA, stackB ) {
  if ( identical( a, b ) ) {
    return true
  }

  const typeA = objectType( a )

  if ( typeA !== objectType( b ) ) {
    return false
  }

  if ( a == null || b == null ) {
    return false
  }

  if ( typeof a[ 'fantasy-land/equals' ] === 'function' || typeof b[ 'fantasy-land/equals' ] === 'function' ) {
    return typeof a[ 'fantasy-land/equals' ] === 'function' && a[ 'fantasy-land/equals' ]( b ) &&
      typeof b[ 'fantasy-land/equals' ] === 'function' && b[ 'fantasy-land/equals' ]( a )
  }

  if ( typeof a.equals === 'function' || typeof b.equals === 'function' ) {
    return typeof a.equals === 'function' && a.equals( b ) &&
      typeof b.equals === 'function' && b.equals( a )
  }

  switch ( typeA ) {
  case 'Arguments':
  case 'Array':
  case 'Object':
    if ( typeof a.constructor === 'function' &&
        _functionName( a.constructor ) === 'Promise' ) {
      return a === b
    }
    break
  case 'Boolean':
  case 'Number':
  case 'String':
    if ( !( typeof a === typeof b && identical( a.valueOf(), b.valueOf() ) ) ) {
      return false
    }
    break
  case 'Date':
    if ( !identical( a.valueOf(), b.valueOf() ) ) {
      return false
    }
    break
  case 'Error':
    return a.name === b.name && a.message === b.message
  case 'RegExp':
    if ( !( a.source === b.source &&
          a.global === b.global &&
          a.ignoreCase === b.ignoreCase &&
          a.multiline === b.multiline &&
          a.sticky === b.sticky &&
          a.unicode === b.unicode ) ) {
      return false
    }
    break
  }

  let idx = stackA.length - 1
  while ( idx >= 0 ) {
    if ( stackA[ idx ] === a ) {
      return stackB[ idx ] === b
    }
    idx -= 1
  }

  switch ( typeA ) {
  case 'Map':
    if ( a.size !== b.size ) {
      return false
    }

    return _uniqContentEquals( a.entries(), b.entries(), stackA.concat( [ a ] ), stackB.concat( [ b ] ) )
  case 'Set':
    if ( a.size !== b.size ) {
      return false
    }

    return _uniqContentEquals( a.values(), b.values(), stackA.concat( [ a ] ), stackB.concat( [ b ] ) )
  case 'Arguments':
  case 'Array':
  case 'Object':
  case 'Boolean':
  case 'Number':
  case 'String':
  case 'Date':
  case 'Error':
  case 'RegExp':
  case 'Int8Array':
  case 'Uint8Array':
  case 'Uint8ClampedArray':
  case 'Int16Array':
  case 'Uint16Array':
  case 'Int32Array':
  case 'Uint32Array':
  case 'Float32Array':
  case 'Float64Array':
  case 'ArrayBuffer':
    break
  default:
      // Values of other types are only equal if identical.
    return false
  }

  const keysA = keys( a )
  if ( keysA.length !== keys( b ).length ) {
    return false
  }

  const extendedStackA = stackA.concat( [ a ] )
  const extendedStackB = stackB.concat( [ b ] )

  idx = keysA.length - 1
  while ( idx >= 0 ) {
    const key = keysA[ idx ]
    if ( !( _has( key, b ) && _equals( b[ key ], a[ key ], extendedStackA, extendedStackB ) ) ) {
      return false
    }
    idx -= 1
  }
  return true
}

export function equals( a: unknown, b: unknown ): boolean
export function equals( a: unknown ): ( b: unknown ) => boolean
/**
 * Todo, function borrowed from Ramda
 */
export function equals( ...args ) {
  return untypedCurry(
    ( a, b ) => _equals( a, b, [], [] ),
  )( ...args )
}
