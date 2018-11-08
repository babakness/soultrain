import test from 'ava'
import {
  _,
  add,
  always,
  and,
  AnyFunction,
  arrayItemsAllEqual,
  arrayItemsMeetPredicate,
  assign,
  bindToInstance,
  complementCurry,
  contains,
  curry,
  dec,
  entries,
  every,
  evolve,
  filter,
  flippedProp,
  flipRectangularMatrix,
  flipRectangularMatrixFromWidth,
  flipSquareMatrix,
  fromPairs,
  groupBy,
  head,
  identity,
  ifElse,
  inc,
  indexValue,
  joinArray,
  Just,
  keys,
  last,
  Lens,
  map,
  Maybe,
  multiply,
  not,
  nothing,
  pairKeys,
  parallel,
  parallelLoose,
  parallelObj,
  pipe,
  pipeline,
  placeholder,
  pluck,
  prop,
  reverse,
  rotateLeftRectangularMatrix,
  rotateLeftRectangularMatrixFromWidth,
  rotateLeftSquareMatrix,
  rotateRectangularMatrix,
  rotateRectangularMatrixFromWidth,
  rotateSquareMatrix,
  safeHead,
  safeIndexValue,
  safeTail,
  split,
  splitAt,
  spread,
  sumArray,
  sumColumn,
  tail,
  test as strTest,
  toArray,
  toArrayReverse,
  toTuple,
  trace,
  Transduce,
  trim,
  ValueAt,
  when,
} from '../src/index'

test( 'tests library works', ( t ) => t.pass() )

test( 'maybe apTuple', ( t ) => {
  const maybeTen = Maybe.of( 10 )
  const maybeTwenty = Maybe.of( 20 )
  t.deepEqual(
    maybeTen.apTuple( maybeTwenty )
      .map( ( i ) => i )
      .joinOrValue( [ 0, 0 ] ),
    [ 20, 10 ],
  )

} )

test( ' spread', ( t ) => {
  const joinArgs = ( a: string ) => ( ...args: string[] ) => args.join( a )
  t.deepEqual(
    pipeline(
      'a-b-c',
      split( '-' ),
      spread( joinArgs( '/' ) ),
    ),
    'a/b/c',
  )
} )

test( 'toTuple', ( t ) => {
  t.deepEqual( toTuple( 1, 2 ), [ 1, 2 ] )
} )

test( 'parallelObj', ( t ) => {
  interface ResultType {
    a: number,
    b: number,
    c: {
      d: number,
    }
    e: number[]
  }
  const result = parallelObj( {a: inc, b: dec, c: {d: inc }, e: [ inc ] }, 100 )
  const e: number[] = result.e
  t.deepEqual(
    result,
    { a: 101, b: 99, c: { d: 101 }, e: [ 101 ] },
  )
} )

test( 'evolve', ( t ) => {
  interface ResultType { a: number, b: number, c: number, z: { y: { x: number, w: number } }, h: number[]}
  const result: ResultType = evolve( { a: inc , b: dec, z: { y : { x : inc }}, h: ( x: number[] ) => x.slice().reverse() }, {a: 4, b: 5, c: 6, z : { y : { x : 10, w: 12 }}, h: [ 1, 2 ]} )
  t.deepEqual(
    result,
    { a: 5, b: 4, c: 6, z: { y: { x: 11, w: 12 } }, h: [ 2, 1 ] },
  )
} )

test( 'lens ADT', ( t ) => {
  const database = [
    { name: 'Tina', score: 100,  luckyBonus:  { diceRolls: [ 3, 6, 3 ], multiplierRoll: 5 }},
    { name: 'Darius', score: 60, luckyBonus:  { diceRolls: [ 3, 3, 3 ], multiplierRoll: 2 }},
    { name: 'Betta', score: 40,  luckyBonus:  { diceRolls: [ 2, 3, 4 ], multiplierRoll: 3 }},
    { name: 'Larry', score: 70,  luckyBonus:  { diceRolls: [ 1, 1, 1 ], multiplierRoll: 6 }},
  ]

  type Row = ValueAt<typeof database, 0>

  interface RowAdjustScore extends Row {
    luckyScore: number
    finalScore: number
  }

  type Always = <T>( a: T ) => ( ( b: any ) => T )
  const lens = Lens.type<RowAdjustScore>()
  const diceRollLens = lens.of( [ [ 'luckyBonus', 'diceRolls' ], [] ] )
  const multiplierLens = lens.of( [ [ 'luckyBonus', 'multiplierRoll' ], 0 ] )
  const bro = diceRollLens.map( always )
  const calculateLuckyScore = lens.of( [ [ 'luckyScore' ], 0 ] )
    .map( ( i ) => i )
    .ap( diceRollLens.map( always as Always ) )
    .map( ( i ) => i )
    .map( parallel(
      sumArray,
      prop( 'length' ),
      arrayItemsMeetPredicate( ( c, p ) => c === p ),
    ) )
    .map( ( i ) => i )
    .ap( multiplierLens.map( ( a ) => ( b ) => b.concat( a ) ) )
    .map( ( [ sum, length, allAreSame, multiplier ]: [number, number, boolean, number] ) =>
      length === 3 && allAreSame
        ? sum * multiplier
        : sum,
    )
    .chain( ( sum ) => lens.of( [ [ 'finalScore' ], sum ] ).map( always( sum ) ) )
    .ap( lens.of( [ [ 'score' ], 0 ] ).map( add ) )

  const processRow = bindToInstance( calculateLuckyScore, 'join' )

  const processedData = database.map(
    ( row ) => pipeline(
      row,
      assign( {luckyScore: 0, finalScore: 0} ),
      processRow,
    ),
  )

  t.deepEqual(
    sumColumn( 'score', processedData ),
    270,
  )

} )

// // test('lens ADT', t => {

// //   const foo = {
// //     w: undefined,
// //     q: 1,
// //     a:{
// //       a: 1
// //     },
// //     c: 102
// //   }

// //   type Foo = typeof foo;

// //   t.deepEqual(
// //     Lens2.type<Foo>().of(['a','a'])
// //       .map( value => value + 1 )
// //       .map( value => value + 1 )
// //       .map( value => value + 1 )
// //       .map( value => value + 1 )
// //       .read(0,foo),
// //     5
// //   )
// //   const myLens = Lens2.type<typeof foo>().of(['a','a'])
// //   const readMyLens = myLens.read(0)
// //   t.deepEqual(
// //     readMyLens(myLens.write(2000,foo)),
// //     2000
// //   )

// //   t.deepEqual(
// //     Lens2.type<Foo>().of(['a']).write(DELETE)(foo),
// //     {c: 102, w: undefined, q: 1}
// //   )

// //   t.deepEqual(
// //     Lens2.type<Foo>().of(['w']).fold(DELETE,foo),
// //     { a: { a: 1 }, c: 102, q: 1 }
// //   )

// //   t.deepEqual(
// //     Lens2.type<Foo>().of(['q']).map(i => i+1).fold(DELETE,foo),
// //     { a: { a: 1 }, c: 102, w: undefined, q: 2 }
// //   )
// // })

// // test('trace with label', t => {
// //   t.deepEqual(traceWithLabel('from label test',100),100)
// // })

// test('clone', t=>{
//   const obj = {
//     a: 1,
//     h: {e: { m: 99 }},
//     b: { c: { d: 2}, zzz: { foo: 20}},
//     z: () => 10
//   }
//   const zxv = _lens(['b','c','d'], x => DELETE , 0,obj)
//   trace(zxv.b)
//   // trace(factorial(32768))
// })

test( 'splitAt', ( t ) => {
  t.deepEqual(
    splitAt( 2, [ 1, 2, 3, 4, 5, 6 ] ),
    [ [ 1, 2 ], [ 3, 4, 5, 6 ] ],
  )
} )
test( 'fromPairs', ( t ) => {
  t.deepEqual(
    fromPairs( [ [ 'a', 1 ], [ 'b', 2 ] ] ),
    {a: 1, b: 2},
  )
  t.deepEqual(
    fromPairs( [ [ 1, 1 ], [ 2, 2 ] ] ),
    {1: 1, 2: 2},
  )
} )
test( 'groupBy', ( t ) => {
  t.deepEqual(
    groupBy( ( x ) => x % 2 ? 'odd' : 'even', [ 1, 2, 3, 4, 5, 6, 7 ] ),
    { odd: [ 1, 3, 5, 7 ], even: [ 2, 4, 6 ] },
  )
} )
test( 'arrayItemsPredicate', ( t ) => {
  t.deepEqual(
    arrayItemsMeetPredicate( ( n1, n2 ) => n1 < n2 , [ 1, 2, 3, 4 ] ),
    true,
  )
  t.deepEqual(
    arrayItemsMeetPredicate( ( n1, n2 ) => n1 < n2 , [ 1, 2, 3, 4, 2 ] ),
    false,
  )
} )

test( 'complement + curry mix', ( t ) => {
  const isBoolean = ( a: unknown ): a is boolean => typeof a === 'boolean' ? true : false
  const isIncreasing = curry( ( a: number, b: number, c: number ): boolean =>
    // nums.reduce( (acc,item) => isBoolean(acc) ? false : item > acc ? item : false, -Infinity  ) === false ? false : true
    [ b, c ].reduce(
      ( acc, item ) => acc.chain( ( previousValue ) => item > previousValue ? Maybe.of( item ) : nothing ) ,
      Maybe.of( a ),
    ).isJust() )

  t.deepEqual(
    complementCurry( isIncreasing as ( a: number, b: number, c: number ) => boolean )( 1 )( 2 )( 3 ),
    false,
  )

} )

test( 'not', ( t ) => {
  const isBoolean = ( a: unknown ): a is boolean => typeof a === 'boolean' ? true : false
  const isIncreasing = ( nums: number[] ): boolean =>
    // nums.reduce( (acc,item) => isBoolean(acc) ? false : item > acc ? item : false, -Infinity  ) === false ? false : true
    tail( nums ).reduce(
      ( acc, item ) => acc.chain( ( previousValue ) => item > previousValue ? Maybe.of( item ) : nothing ) ,
      Maybe.of( head( nums ) ),
    ).isJust()
  const isNotIncreasing = pipe( isIncreasing, not )
  t.deepEqual( isNotIncreasing( [ 1, 2, 3, 2 ] ), true )
} )

test( 'placeholders', ( t ) => {
  // const isAllTrue = (...bools: boolean[]): boolean => bools.reduce( (acc,item) =>  acc && item ,true)
  const isBoolean = ( a: unknown ): a is boolean => typeof a === 'boolean' ? true : false
  const isIncreasing = ( ...nums: number[] ): boolean =>
    // nums.reduce( (acc,item) => isBoolean(acc) ? false : item > acc ? item : false, -Infinity  ) === false ? false : true
    tail( nums ).reduce(
      ( acc, item ) => acc.chain( ( previousValue ) => item > previousValue ? Maybe.of( item ) : nothing ) ,
      Maybe.of( head( nums ) ),
    ).isJust()

  const divide = ( numerator: number, denomenator: number ) => numerator / denomenator
  const half = placeholder( divide, _, 2 )
  pipeline(
    10,
    half,
  )
  const mySequence = placeholder( isIncreasing, 1, 2, 3, _, 5 )
  t.deepEqual( mySequence( 8 )  , false )
  t.deepEqual( mySequence( 4 )  , true )

  const friendlyTemplate = ( name: string, message: string ): string => `Hello ${name}! ${message}`
  const welcome = placeholder( friendlyTemplate, _ , 'Welcome to Oregon!' )

  t.deepEqual( welcome( 'Roxanne' ), 'Hello Roxanne! Welcome to Oregon!' )
} )

test( 'curry', ( t ) => {
  // tslint:disable-next-line:no-shadowed-variable
  const testingAdd = curry( function testingAdd( a: number, b: number ): number { return a + b } )
  const testInc = testingAdd( 1 )
  t.deepEqual(
    testingAdd.name,
    'testingAdd',
  )
  t.deepEqual(
    testingAdd.length,
    2,
  )
  t.deepEqual(
    testInc.length,
    1,
  )
  t.deepEqual(
    testInc( 10 ),
    11,
  )
} )

test( 'arrayItemsAllEqual', ( t ) => {
  t.deepEqual(
    arrayItemsAllEqual( 1, [ 1, 2, 3 ] ),
    false,
  )
  t.deepEqual(
    arrayItemsAllEqual( 1, [ 1, 1, 1 ] ),
    true,
  )
} )

test( 'test pluck', ( t ) => {
  const matrix = [
    [ 1, 2, 3 ],
    [ 4, 5, 6 ],
    [ 7, 8, 9 ],
  ]

  t.deepEqual(
    pluck( 1, matrix ),
    [ 2, 5, 8 ],
  )

} )

test( 'test matrix functions', ( t ) => {
  const matrixSquare = [
    [ 1, 2, 3 ],
    [ 4, 5, 6 ],
    [ 7, 8, 9 ],
  ]
  const matrixRectangle = [
    [ 1, 2, 3, 4 ],
    [ 5, 6, 7, 8 ],
    [ 9, 10, 11, 12 ],
  ]

  t.deepEqual(
    flipRectangularMatrixFromWidth( 4, matrixRectangle ),
    [ [ 1, 5, 9 ], [ 2, 6, 10 ], [ 3, 7, 11 ], [ 4, 8, 12 ] ],
  )

  t.deepEqual(
    flipRectangularMatrix( matrixRectangle ),
    [ [ 1, 5, 9 ], [ 2, 6, 10 ], [ 3, 7, 11 ], [ 4, 8, 12 ] ],
  )

  t.deepEqual(
    rotateRectangularMatrixFromWidth( 4, matrixRectangle ),
    [ [ 9, 5, 1 ], [ 10, 6, 2 ], [ 11, 7, 3 ], [ 12, 8, 4 ] ],
  )

  t.deepEqual(
    rotateRectangularMatrix( matrixRectangle ),
    [ [ 9, 5, 1 ], [ 10, 6, 2 ], [ 11, 7, 3 ], [ 12, 8, 4 ] ],
  )

  t.deepEqual(
    rotateLeftRectangularMatrixFromWidth( 4, matrixRectangle ),
    [ [ 4, 8, 12 ], [ 3, 7, 11 ], [ 2, 6, 10 ], [ 1, 5, 9 ] ],
  )

  t.deepEqual(
    rotateLeftRectangularMatrix( matrixRectangle ),
    [ [ 4, 8, 12 ], [ 3, 7, 11 ], [ 2, 6, 10 ], [ 1, 5, 9 ] ],
  )

  t.deepEqual(
    flipSquareMatrix( matrixSquare ),
    [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ],
  )

  t.deepEqual(
    rotateSquareMatrix( matrixSquare ),
    [ [ 7, 4, 1 ], [ 8, 5, 2 ], [ 9, 6, 3 ] ],
  )

  t.deepEqual(
    rotateLeftSquareMatrix( matrixSquare ),
    [ [ 3, 6, 9 ] , [ 2, 5, 8 ],  [ 1, 4, 7 ]  ],

  )

} )

test( 'test index, safeIndex', ( t ) => {
  t.deepEqual(
    indexValue( 2, [ 1, 2, 3 ] ),
    3,
  )
  t.deepEqual(
    safeIndexValue( 2, [ 1, 2, 3 ] ),
    Maybe.of( 3 ),
  )
  t.deepEqual(
    safeIndexValue( 10, [ 1, 2, 3 ] ),
    nothing,
  )
} )

test( 'test every', ( t ) => {
  t.deepEqual(
    every( 2, 1, [ 1, 2, 3, 4 ] ),
    [ 2, 4 ],
  )
} )

test( 'Test add', ( t ) => {
  t.deepEqual( add( 4 )( 10 ), 14 )
} )

test( 'Test pipeline, add, multiply, toArray', ( t ) => {
  t.deepEqual(
    pipeline(
      4,
      add( 6 ),
      multiply( 2 ),
      String,
      toArray,
      reverse,
      joinArray( '' ),
      Number,
    ),
    2,
  )
} )

test( 'Test Maybe, Just, safetail, trace, toArrayReverse, safehead', ( t ) => {
  const result = Maybe.of( [ 1, 2, 3 ] )
    .chain( safeTail )
    .map( ( i ) => i )
    .map( toArrayReverse )
    .map( ( i ) => i )
    .chain( safeHead )
    .map( ( i ) => i ) // type of i should be number
    .joinOrValue( 0 )
  t.deepEqual( result, 3 )
} )

test( 'Test pipe, and, ifElse', ( t ) => {
  t.deepEqual(
    pipe( and( ( a ) => a > 5 , ( a: number ) => a % 2 === 0 ), ifElse( ( a: boolean ) => a, ( a ) =>  99, ( a ) => 3 ) )( 4 ),
    3,
  )
} )

test( 'Test Transduce, multiply, add, last', ( t ) => {
  const values = Transduce.of( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ] )
    .map( multiply( 2 ) )
    .map( add( 10 ) )
    .chain( ( i ) => Transduce.of( [ i, i ** 2 ] ) )
    .every( 2, 1 )
    .take( 2 )
    .map( last )
    .join()
  t.deepEqual(
    last( values ),
    324, // 4 is second of take every 2 offset 1. (4 * 2 + 10) ** 2 = 324
  )
} )

test( 'Map iterable, toEntries, entryKeys', ( t ) => {
  t.deepEqual(
    pipeline(
      {a: 1, b: 2, c: 3},
      entries,
      ( x ) => new Map( x ),
      ( x ) => toArray( x as any ),
      pairKeys as () => string[],
      head,
    ),
    'a',
  )
} )

test( 'String tests, map, filter test (accepting the right types, etc)', ( t ) => {
  t.deepEqual(
    pipeline( '  Hello sam!',
      trim,
      split( ' ' ),
      map( toArray ),
      map( pipe( reverse, joinArray( '' ) ) ),
      map( parallelLoose( strTest( /^!/ ), identity ) ),
      filter( ( [ k, v ] ) => k ),
      map( pipe( ( [ k, v ] ) => v ) ),
      head,

    ),
    '!mas',
  )
} )

const cast = <A, B>( a: Array<[A, B]> ) => a

test( ' objects', ( t ) => {
  const replacements = {
    apple: 'blueberries',
  }
  const obj = {apple: 1, banana: 2, peach: 'string'}
  const bro = entries( obj )
  const transformedObj = Transduce.of( entries( obj ) )
    .map( ( i ) => i )
    .filterPairValueType( ( v ): v is number => typeof v === 'number' )
    .mapPairKey( when( contains( keys( replacements ) ), flippedProp( replacements ) ) )
    .map( ( i ) => i )
    .joinFromPairs()
  t.deepEqual(
      { blueberries: 1, banana: 2 },
      transformedObj,
    )
} )

// test('sequence test', t => {

//   const xxx = Transduce.of([Maybe.of(1),Maybe.of(2)])
//     .map( i => i )
//     .sequence( Maybe )
//     // .joinOrValue( Transduce.of([9]) )
//   const foo = xxx
//   console.log(foo)

// })

test( 'traverse maybe', ( t ) => {

  t.deepEqual(
    pipeline(
      Maybe.of( [ 1, 2, 3, 5 ] )
      .map( ( i ) => i )
      .traverse( Array, ( i: number[] ): number[] => i ),
      head,
    ),
    Just.of( 1 ),
  )

  t.deepEqual(
    Maybe.of( [ 1, 2, 3, undefined ] )
    .map( ( i ) => i )
    .traverseNullable( Array, ( i: any[] ): number[] => i ),
    [ Just.of( 1 ), Just.of( 2 ), Just.of( 3 ), nothing ],
  )

} )

test( 'sequence maybe', ( t ) => {

  t.deepEqual(
    pipeline(
      Maybe.of( [ 1, 2, 3, 5 ] )
      .map( ( i ) => i )
      .sequence( Array ),
      head,
    ),
    Just.of( 1 ),
  )
} )

test( 'traverse transduce', ( t ) => {
  t.deepEqual(
    Transduce.of( [ 5, 2, undefined ] )
      .map( ( i ) => i )
      .traverse( Maybe, <A>( a: A ): Maybe<A> => Maybe.of( a ) )
      .joinOrValue( Transduce.of( [ 0 ] ) )
      .join(),
    Transduce.of( [ 5, 2, undefined ] )
      .join(),
  )

  t.deepEqual(
    Transduce.of( [ 5, 2, undefined ] )
      .map( ( i ) => i )
      .traverse( Maybe, <A>( a: A ): Maybe<A> => Maybe.from( a ) ),
    nothing,
  )

} )
