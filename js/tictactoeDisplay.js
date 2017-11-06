$( document ).ready( function () {
  $( '.board' ).on( 'click', function() {
    const clickCoordinate = $( this ).attr( 'id' );

    if ( turn % 2 === 0 ) {
      $( this ).text( 'X' );
    }
    else {
      $( this ).text( 'O' );
    }
    turn += 1;
  });
});
