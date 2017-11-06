const board = [
  [ '_', '_', '_' ],
  [ '_', '_', '_' ],
  [ '_', '_', '_' ]
];

const height = 3;
const length = 3;

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
  for ( let i = 0; i < height; i++ ) {
    if ( checkLine( board[ i ] ) ) {
      return true;
    }
  }
  return false;
}

const checkColumns = function () {
  for ( let i = 0; i < height; i++ ) {
    const column = [];
    for ( let j = 0; j < length; j++ ) {
      column.push( board[ j ][ i ] );
    }
    if ( checkLine( column ) ) {
      return true;
    }
  }
  return false;
}

const checkLine = function ( line ) {
  const unique = [ ... new Set( line ) ];
  if ( unique.length === 1 && unique[ 0 ] !== '_' ) {
    return true;
  } else {
    return false;
  }
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
