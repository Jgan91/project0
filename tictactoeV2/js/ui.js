const ui = {};

ui.currentView = '';

ui.initialControlsVisible = true;

ui.switchViewTo = function ( turn ) {
  // helper function for async calling
  const _switch = function ( _turn ) {
    ui.currentView = '#' + _turn;
    $( ui.currentView ).fadeIn( 'fast' );
    if ( _turn === 'won' || _turn === 'lost' || _turn === 'draw' ) {
      $( '#replay, #confirm' ).fadeIn( 'fast' );
    }
  }

  if ( ui.initialControlsVisible ) {
    ui.initialControlsVisible = false;

    $( '.initial' ).fadeOut({
      duration: 'fast',
      done: function () {
        _switch( turn );
      }
    });
  }
  else {
    $( ui.currentView ).fadeOut({
      duration: 'fast',
      done: function () {
        _switch( turn );
      }
    });
  }

}

ui.insertAt = function ( index, symbol ) {
  const $board = $( '.cell' );
  const $targetCell = $( $board[ index ] );

  if ( !$targetCell.hasClass( 'occupied' ) ) {
    $targetCell.html( symbol );
    $targetCell.addClass( 'occupied' );
  }
}

ui.resetBoard = function () {
  $( '.cell' ).text( '' ).removeClass( 'occupied' );
  $( '#replay, #pester, #confirm' ).fadeOut( 'fast' );
  $( '.turns' ).empty();
}

ui.pester = function () {
  $( '#replay').hide();
  $( '#pester').fadeOut( 'fast' ).fadeIn( 'fast ' );
}

ui.showHistory = function () {
  const history = globals.game.currentState.history;
  $( '.turns' ).append( `<div data-turn='${ history.length - 1 }'>Turn ${ history.length - 1 }</div>` );
}
