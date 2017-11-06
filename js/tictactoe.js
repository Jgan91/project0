const board = [
  [ '_', '_', '_' ],
  [ '_', '_', '_' ],
  [ '_', '_', '_' ]
];

let turn = 0;

const takeTurn = function ( x, y ) {
  console.log( board );
  if ( turn % 2 === 0 ) {
    board[y][x] = 'X';
  } else {
    board[y][x] = 'O';
  }
  turn += 1
}

const checkWin = function () {
  if ( checkRows() ) {
    return true;
  }
  else if ( checkColumns() ) {
    return true;
  }
  else if ( checkDiagonals() ) {
    return true;
  }
  return false;
}

const checkRows = function () {
  let win = true;
  for ( let i = 0; i < board.length; i++ ) {
    if ( checkRow( board[ i ] )
  }
}

const checkRow = function ( row ) {
  let win = true;
  for ( let i = 1; i < board.length; i++ ) {
    if ( row[ i ] === '_' || row[ i ] !== row[ i - 1 ] ) {
      win = false;
      break;
    }
  }
  return win;
}

$( document ).ready( function () {
  $( '.board' ).on( 'click', function() {
    const clickedSquareCoordinate = $( this ).attr( 'id' );

    if ( turn % 2 === 0 ) {
      $( this ).text( 'X' );
    }
    else {
      $( this ).text( 'O' );
    }
    turn += 1;
  });
});

// let coordinates = {
//   0: {
//     x: 0,
//     y: 0
//   },
//   1: board[ 0 ][ 1 ],
//   2: board[ 0 ][ 2 ],
//   3: board[ 1 ][ 0 ],
//   4: board[ 1 ][ 1 ],
//   5: board[ 1 ][ 2 ],
//   6: board[ 2 ][ 0 ],
//   7: board[ 2 ][ 1 ],
//   8: board[ 2 ][ 2 ]
// }
