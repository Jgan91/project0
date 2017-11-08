const globals = {};

$( document ).ready( function () {
  $( '.start' ).on( 'click', function () {
    const selectedDifficulty = 'random';
    if ( typeof selectedDifficulty !== 'undefined' ) {
      const aiPlayer = new AI( selectedDifficulty );
      globals.game = new Game( aiPlayer );

      aiPlayer.plays( globals.game );

      globals.game.start();
    }
  });

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
