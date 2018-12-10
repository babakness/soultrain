import test from 'ava'
import {
  maybeAllValues,
  staticType,
  trace,
} from '../src/index'

test( 'maybeAllValues', ( t ) => {
  const boo: null | string = Math.random() > .5 ? null : 'a'
  const ending = Symbol()
  const foo =  maybeAllValues( {a: boo, b: 2} )
  .map( ( {a} ) => a )
  .map( staticType<string>() )
  .map( () => ending )
  .joinOrValue( ending )

  const foo2 =  maybeAllValues( [ boo, 2 ] )
  .map( ( [ a, b ] ) => b )
  .map( staticType<number>() )
  .map( ( a ) => ending )
  .joinOrValue( ending )

  t.deepEqual( foo, foo2 )

} )
