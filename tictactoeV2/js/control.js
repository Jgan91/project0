const globals = {};

$( document ).ready( function () {
  $( '.cell' ).on( 'click', function () {
    if ( globals.game.status === 'running' && globals.game.currentState.turn === 'X' && !( $( this ).hasClass( 'occupied' ) ) ) {
      const index = parseInt( $( this ).data( 'index' ) );
      const next = new State( globals.game.currentState );

      next.board[index] = 'X';

      ui.insertAt( index, 'X' );

      next.changeTurn();

      globals.game.advanceTo( next );
    }
  });
});
