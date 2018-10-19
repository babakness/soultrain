/** @module combinators.ts */
/* tslint:disable */
export const I = <A >( x: A ): A => x
export const K = <A>( x: A ) => ( y: any ): A => x
export const A = <A, B>( f: ( x: A ) => B ) => ( x: A ): B => f( x )
export const T = <A>( x: A ) => <B>( f: ( a: A ) => B ): B => f( x )
export const W = <A, B>( f: ( a: A ) => ( b: A ) => B ) => ( x: A ): B => f( x )( x )
export const C = <A, B, C>( f: ( x: A ) => ( y: B ) => C ) => ( y: B ) => ( x: A ): C => f( x )( y )
export const B = <A, B, C>( f: ( b: B ) => C ) => ( g: ( a: A ) => B ) => ( a: A ): C => f( g( a ) )
export const S = <A, B, C>( f: ( a: A ) => ( b: B ) => C ) => ( g: ( a: A ) => B ) => ( a: A ): C => f( a )( g( a ) )
export const P = <A, B, X, Y>( f: ( a: A ) => ( b: A ) => B ) => ( g: ( a: X|Y ) => A ) => ( x: X ) => ( y: Y ): B => f( g( x ) )( g( y ) )
export const Y = <A>( f: ( fn: Function ) => A ): A => ( ( g ) => g( g ) )( ( g ) => f( ( x ) => g( g )( x ) ) )