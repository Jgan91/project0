$( document ).ready( function () {
  $( '.board' ).on( 'click', function() {
    const x = $( this ).data( 'x' );
    const y = $( this ).data( 'y' );

    if ( !gameOver() ) {
      $( this ).text( takeTurn( x, y ) );
      if ( gameOver() ) {
        $( '.msg' ).text( `Congratulations player "${ currentPlayer }". A winner is you!`);
      }
      if ( gameOver() === 'draw' ) {
        $( '.msg' ).text( `It's a draw. How deeply unsatisfying.`);
      }
    }


  });
});
