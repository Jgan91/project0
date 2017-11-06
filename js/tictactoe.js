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
  if ( board[x][y] === '_' ) {
    if ( turn % 2 === 0 ) {
      board[x][y] = 'X';
    } else {
      board[x][y] = 'O';
    }
    turn += 1;
    return board[x][y];
  }
}

const gameOver = function () {
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
