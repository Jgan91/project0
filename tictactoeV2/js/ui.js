const ui = {};

ui.currentView = '';

// ui.switchViewTo = function ( turn ) {
//   // helper function for async calling
//   const _switch = function ( _turn ) {
//     ui.currentView = '#' + _turn;
//     $( ui.currentView ).fadeIn( 'fast' );
//   }
// }

ui.insertAt = function ( index, symbol ) {
  const $board = $( '.cell' );
  const $targetCell = $( $board[ index ] );

  if ( !$targetCell.hasClass( 'occupied' ) ) {
    $targetCell.html( symbol );
    $targetCell.addClass( 'occupied' );
  }
}
