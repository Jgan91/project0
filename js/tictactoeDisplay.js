const render = function () {
  // const $board = $( '.board' );
  // console.log( $board );
  // const $square0 = $( '[data-x="0"][data-y="0"]' );
  // const $square1 = $( '[data-x="1"][data-y="0"]' );
  // console.log( $square0 );
}

$( document ).ready( function () {
  $( '.board' ).on( 'click', function() {
    const x = $( this ).data( 'x' );
    const y = $( this ).data( 'y' );
    console.log( x, y );
    // 
    // if ( turn % 2 === 0 ) {
    //   $( this ).text( 'X' );
    // }
    // else {
    //   $( this ).text( 'O' );
    // }

    $( this ).text( takeTurn( x, y ) );

  });
});
