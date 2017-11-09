const State = function ( old ) {

  this.turn = '',
  this.result = 'still running',
  this.aiMovesCount = 0,

  this.board = [];

  // begin object construction
  // copy old board
  if ( typeof old !== 'undefined' ) {
    this.turn = old.turn;
    this.result = old.result;
    this.aiMovesCount = old.aiMovesCount;

    const area = old.board.length;
    this.board = [];
    for ( let i = 0; i < area; i++ ) {
      this.board[i] = old.board[i];
    }

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
    const area = this.board.length;
    const emptyCellIndexes = [];
    for ( let i = 0; i < area; i++ ) {
      if ( this.board[ i ] === '_' ) {
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
    for ( let i = 0, j = 4; i < len; i = i + 2, j = j - 2 ) {
      if ( B[i] !== '_' && B[i] === B[i + j] && B[i + j] === B[i + (j * 2)] ) {
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

const Game = function (aiPlayer) {
  // initialize game
  this.ai = aiPlayer;

  this.currentState = new State();

  this.currentState.board = [ '_', '_', '_',
                              '_', '_', '_',
                              '_', '_', '_' ];

  // 'X' plays first
  this.currentState.turn = 'X';

  this.status = 'beginning';

  // transition function
  this.advanceTo = function ( _state ) {
    this.currentState = _state;
    if ( _state.isTerminal() ) {
      this.status = 'ended';

      if ( _state.result === 'X-won' ) {
        // ui.switchViewTo( 'won' );
        console.log( 'won' );
      }
      else if ( _state.result === 'O-won' ) {
        // ui.switchViewTo( 'lost' );
        console.log( 'lost' );
      }
      else {
        // ui.switchViewTo( 'draw' );
        console.log( 'draw' );
      }
    }
    // if game still running
    else {
      if ( _state.turn === 'X' ) {
        ui.switchViewTo( 'human' );
      }
      else {
        ui.switchViewTo( 'robot' );
        this.ai.notify( 'O' );
      }
    }
  }

  this.start = function () {
    if ( this.status === 'beginning' ) {
      this.advanceTo( this.currentState );
      this.status = 'running';
    }
  }
}

Game.score = function ( _state ) {
  if ( _state.result !== 'still running' ) {
    if ( _state.result === 'X-won' ) {
      return 10 - _state.aiMovesCount;
    }
    else if ( _state.result === 'O-won' ) {
      return -10 + _state.aiMovesCount;
    }
    else if ( _state.result === 'draw' ) {
      return 0;
    }
  }
}
