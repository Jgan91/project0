const board = [
  [ '_', '_', '_' ],
  [ '_', '_', '_' ],
  [ '_', '_', '_' ]
];

const height = 3;
const length = 3;

let turn = 0;
let currentPlayer = 'X';

const takeTurn = function ( x, y ) {
  if ( board[x][y] === '_' ) {
    if ( currentPlayer === 'X' ) {
      board[x][y] = 'X';
      if ( !gameOver() ) {
        currentPlayer = 'O';
      }
    } else {
      board[x][y] = 'O';
      if ( !gameOver() ) {
        currentPlayer = 'X';
      }
    }
    turn += 1;
  }

  return board[x][y];
}

const gameOver = function () {
  if ( turn > 8 ) {
    return 'draw';
  }
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
  for ( let y = 0; y < height; y++ ) {
    if ( checkLine( board[ y ] ) ) {
      return true;
    }
  }
  return false;
}

const checkColumns = function () {
  for ( let y = 0; y < height; y++ ) {
    const column = [];
    for ( let x = 0; x < length; x++ ) {
      column.push( board[ x ][ y ] );
    }
    if ( checkLine( column ) ) {
      return true;
    }
  }
  return false;
}

const checkDiagonals = function () {
  const topBottom = [ board[ 0 ][ 0 ], board[ 1 ][ 1 ], board[ 2 ][ 2 ] ];
  const bottomTop = [ board[ 2 ][ 0 ], board[ 1 ][ 1 ], board[ 0 ][ 2 ] ];
  if ( checkLine( topBottom ) || checkLine( bottomTop ) ) {
    return true;
  }
  else {
    return false;
  }
}

const checkLine = function ( line ) {
  const unique = [ ... new Set( line ) ];
  if ( unique.length === 1 && unique[ 0 ] !== '_' ) {
    return true;
  } else {
    return false;
  }
}
