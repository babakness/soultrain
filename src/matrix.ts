/** @module matrix.ts */
import { head } from './array/head'
import { pluck } from './array/pluck'
import { reverse } from './array/reverse'
import { times } from './flow'
import { pipeline } from './function/pipeline'
import { untypedCurry } from './function/untypedCurry'

const _flipRectangularMatrix = untypedCurry( ( rowLength, arr ) => times( ( iteration ) => {
  return pluck( iteration, arr )
},
  rowLength,
) )

/**
 * Takes a rectangular matrix at a specified width
 * returns calculated flipped matrix
 * @example
 * flipRectangularMatrix(4, [ [1,2,3,4], [5,6,7,8], [9,10,11,12]  ] )
 * // [ [ 1, 5, 9 ], [ 2, 6, 10 ], [ 3, 7, 11 ], [ 4, 8, 12 ] ]
 */
export function flipRectangularMatrixFromWidth<A>( rowLenght: number, matrix: A[][] ): A[][]
export function flipRectangularMatrixFromWidth<A>( rowLenght: number ): ( matrix: A[][] ) => A[][]
export function flipRectangularMatrixFromWidth( ...args ) {
  return _flipRectangularMatrix( ...args )
}

/**
 * Takes a rectangular matrix and returns calculated flipped matrix
 * @example
 * flipRectangularMatrixUsingFirstRowLength( [
 *    [1,2,3,4],
 *    [5,6,7,8],
 *    [9,10,11,12]
 * ] )
 * // [ [ 1, 5, 9 ], [ 2, 6, 10 ], [ 3, 7, 11 ], [ 4, 8, 12 ] ]
 *
 */
export function flipRectangularMatrix<A>( matrix: A[][] ): A[][] {
  return flipRectangularMatrixFromWidth( head( matrix ).length, matrix )
}

const _rotateRectangularMatrix = untypedCurry( ( rowLength, matrix ) => times( ( iteration ) => {
  return pluck( iteration, [ ...matrix ].reverse() )
},
rowLength,
) )

/**
 * Takes a rectangular matrix at a specified width
 * returns calculated right rotated matrix
 * @example
 * rotateRectangularMatrix(4, [ [1,2,3,4], [5,6,7,8], [9,10,11,12]  ] )
 * // [ [ 9, 5, 1 ], [ 10, 6, 2 ], [ 11, 7, 3 ], [ 12, 8, 4 ] ]
 *
 */
export function rotateRectangularMatrixFromWidth<A>( rowLenght: number, matrix: A[][] ): A[][]
export function rotateRectangularMatrixFromWidth<A>( rowLenght: number ): ( matrix: A[][] ) => A[][]
export function rotateRectangularMatrixFromWidth( ...args ) {
  return _rotateRectangularMatrix( ...args )
}

/**
 * Takes a rectangular matrix and returns calculated right rotated matrix
 * @example
 * rotateRectangularMatrixUsingFirstRowLength( [
 *    [1,2,3,4],
 *    [5,6,7,8],
 *    [9,10,11,12]
 * ] )
 * // [ [ 9, 5, 1 ], [ 10, 6, 2 ], [ 11, 7, 3 ], [ 12, 8, 4 ] ]
 *
 */
export function rotateRectangularMatrix<A>( matrix: A[][] ): A[][] {
  return rotateRectangularMatrixFromWidth( head( matrix ).length, matrix )
}

const _rotateLeftRectangularMatrix = untypedCurry( ( rowLength, matrix ) =>
  pipeline( flipRectangularMatrixFromWidth( rowLength, matrix ), reverse ),
)

/**
 * Takes a rectangular matrix at a specified width
 * returns calculated left rotated matrix
 * @example
 * rotateLeftRectangularMatrix( 4, [
 *    [1,2,3,4],
 *    [5,6,7,8],
 *    [9,10,11,12]
 * ] )
 * [ [ 4, 8, 12 ], [ 3, 7, 11 ], [ 2, 6, 10 ], [ 1, 5, 9 ] ]
 */
export function rotateLeftRectangularMatrixFromWidth<A>( rowLenght: number, matrix: A[][] ): A[][]
export function rotateLeftRectangularMatrixFromWidth<A>( rowLenght: number ): ( matrix: A[][] ) => A[][]
export function rotateLeftRectangularMatrixFromWidth( ...args ) {
  return _rotateLeftRectangularMatrix( ...args )
}

/**
 * Takes a rectangular matrix and returns calculated left rotated matrix
 * @example
 * rotateLeftRectangularMatrixUsingFirstRowLength( 4, [
 *    [1,2,3,4],
 *    [5,6,7,8],
 *    [9,10,11,12]
 * ] )
 * [ [ 4, 8, 12 ], [ 3, 7, 11 ], [ 2, 6, 10 ], [ 1, 5, 9 ] ]
 */
export function rotateLeftRectangularMatrix<A>( matrix: A[][] ): A[][] {
  return rotateLeftRectangularMatrixFromWidth( head( matrix ).length, matrix )
}

/**
 * Takes a square matrix and returns calculated flipped matrix
 * @example
 * flipSquareMatrix( [
 *    [1,2,3],
 *    [4,5,6],
 *    [7,8,9]
 * ] )
 * // [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]
 */
export function flipSquareMatrix<A>( matrix: A[][] ): A[][] {
  return flipRectangularMatrixFromWidth( matrix.length, matrix )
}

/**
 * Takes a square matrix and returns calculated right rotated matrix
 * @example
 * rotateSquareMatrix( [
 *    [1,2,3],
 *    [4,5,6],
 *    [7,8,9]
 * ] )
 * // [ [ 7, 4, 1 ], [ 8, 5, 2 ], [ 9, 6, 3 ] ]
 */
export function rotateSquareMatrix<A>( matrix: A[][] ): A[][] {
  return rotateRectangularMatrixFromWidth( matrix.length, matrix )
}

/**
 * Takes a square matrix and returns calculated left rotated matrix
 * @example
 * rotateLeftSquareMatrix( [
 *    [1,2,3],
 *    [4,5,6],
 *    [7,8,9]
 * ] )
 * // [ [ 3, 6, 9 ] , [ 2, 5, 8 ],  [ 1, 4, 7 ],  ]
 *
 */
export function rotateLeftSquareMatrix<A>( matrix: A[][] ): A[][] {
  return rotateLeftRectangularMatrixFromWidth( matrix.length, matrix )
}
