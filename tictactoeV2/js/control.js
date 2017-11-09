const globals = {};

$( document ).ready( function () {
  $( '.level' ).each( function () {
    const $this = $( this );
    $this.on( 'click', function () {
      $( '.selected' ).toggleClass( 'not-selected' );
      $( '.selected' ).toggleClass( 'selected' );
      $this.toggleClass( 'selected' );
      $this.toggleClass( 'not-selected' );
    });
  });

  $( '.start' ).on( 'click', function () {
    const selectedDifficulty = $( '.selected' ).attr( 'id' );
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

  $( '#reset' ).on( 'click', function () {
    ui.resetBoard();

    const aiPlayer = new AI ( globals.game.ai.AIDifficulty );
    globals.game = new Game( aiPlayer );

    aiPlayer.plays( globals.game );

    globals.game.start();
  });

  $( '#denied' ).on( 'click', function () {
    ui.pester();
  });

  $( '.turns' ).on( 'click', 'div', function () {
    const clickedTurn = $( this ).data( 'turn' );
    debugger;
    const histories = globals.game.currentState.history;
    const chosenTurn = histories[ clickedTurn ];
    const returnBoard = chosenTurn.board;
    console.log( returnBoard );
    ui.resetBoard();

    const aiPlayer = new AI ( globals.game.ai.AIDifficulty );
    globals.game = new Game( aiPlayer );

    aiPlayer.plays( globals.game );

    globals.game.start();

    for ( let i = 0; i < returnBoard.length; i++ ) {
      if ( returnBoard[i] !== '_' ) {
        ui.insertAt( i, returnBoard[ i ] );
      }
    }

  });
});
