import test from 'ava'
import {
  bind, bindStrict, staticType,
} from '../src/index'

const addThree = ( a: number, b: number, c: number ) => a + b + c
test( 'bind', ( t ) => {
  const bound3 = bind( addThree, 1 , 2, 3 ) // as ( a: void ) => number
  const bound2 = bind( addThree, 1 , 2 )
  const bound1 = bind( addThree, 1 )
  t.deepEqual( bound3(), 6 )
  t.deepEqual( bound2( 3 ) , 6 )
  t.deepEqual( bound1( 2 , 3 ), 6 )

  const bindOnceMore = bind( bound2, 3 )
  t.deepEqual( bindOnceMore(), 6 )

  staticType<() => number>()( bound3 )
  staticType<( onlyFailtsWithStrict: number ) => number>()( bound3 )
  staticType<( b: number ) => number>()( bound2 )
  staticType<( b: number, c: number ) => number>()( bound1 )

} )

test( 'bindStrict', ( t ) => {
  const bound3 = bindStrict( addThree, 1 , 2, 3 ) // as ( a: void ) => number
  const bound2 = bindStrict( addThree, 1 , 2 )
  const bound1 = bindStrict( addThree, 1 )
  t.deepEqual( bound3(), 6 )
  t.deepEqual( bound2( 3 ) , 6 )
  t.deepEqual( bound1( 2 , 3 ), 6 )

  const bindOnceMore = bind( bound2, 3 )
  t.deepEqual( bindOnceMore(), 6 )

  staticType<() => number>()( bound3 )
  // staticType< ( onlyFailtsWithStrict: number ) => number>()( bound3 )
  staticType<( b: number ) => number>()( bound2 )
  staticType<( b: number, c: number ) => number>()( bound1 )

} )
