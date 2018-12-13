import test from 'ava'
import {
  times,
  times_,
  timesWithRepeat,
  timesWithRepeat_,
  trace,
} from '../src/index'

test( 'times', ( t ) => {
  t.deepEqual(
    times( ( i ) => i , 3 ),
    [ 0, 1, 2 ],
  )
} )

test( 'times_', ( t ) => {
  t.deepEqual(
    times_( 3, ( i ) => i ),
    [ 0, 1, 2 ],
  )
} )

test( 'timesWithRepeat', ( t ) => {
  t.deepEqual(
    timesWithRepeat( ( i, r ) => i + r, 3 ),
    [ 3, 4, 5 ],
  )
} )

test( 'timesWithRepeat_', ( t ) => {
  t.deepEqual(
    timesWithRepeat_( 3, ( i, r ) => i + r ),
    [ 3, 4, 5 ],
  )
} )
