const State = function ( old ) {

  this.turn = '',

  this.result = 'still running',

  this.aiMovesCount = 0,

  this.board = [];

  // begin object construction
  // copy old board
  if ( typeof old !== undefined ) {
    const area = old.board.length;
    this.board = [];
    for ( let i = 0; i < area; i++ ) {
      this.board[i] = old.board[i];
    }

    this.turn = old.turn;
    this.result = old.result;
    this.aiMovesCount = old.aiMovesCount;
  }
  // end object construction

  this.changeTurn = function () {
    if ( this.turn === 'X' ) {
      this.turn = 'O';
    } else if ( this.turn === 'O' ) {
      this.turn = 'X';
    }

  }

  this.getEmptyCells = function () {
    const area = old.board.length;
    const emptyCellIndexes = [];
    for ( let i = 0; i < area; i++ ) {
      if ( this.board === '_' ) {
        emptyCellIndexes.push( i );
      }
    }
    return emptyCellIndexes;
  }

  this.isTerminal = function () {
    const B = this.board;
    const area = this.board.length;
    const len = area / 3;

    // check rows
    for ( let i = 0; i < area; i = i + 3) {
      if ( B[i] !== '_' && B[i] === B[i + 1] && B[i + 1] === B[i + 2] ) {
        this.result = B[i] + '-won';
        return true;
      }
    }

    // check columns
    for ( let i = 0; i < len; i++ ) {
      if ( B[i] !== '_' && B[i] === B[i + 3] && B[i + 3] === B[i + 6] ) {
        this.result = B[i] + '-won';
        return true;
      }
    }

    // check diagonals
    for ( let i = 0; i < len; i = i + 2 ) {
      if ( B[i] !== '_' && B[i] === B[i + 4] && B[i + 4] === B[i + 8] ) {
        this.result = B[i] + '-won';
        return true;
      }
    }

    // check for draw
    const emptyCells = this.getEmptyCells();
    if ( emptyCells.length === 0 ) {
      this.result = 'draw';
      return true;
    }
    else {
      return false;
    }
  }

}
